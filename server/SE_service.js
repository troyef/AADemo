/**
SE_service.js

A module for querying the stackexchange service. 

Many of the stackoverflow questions are tagged with the associated keywords, but not all. So we do a search for both
questions with the keyword tag as well as those not tagged but have the keyword in the body of the question.

**/

var Stackexchange = require('stackexchange');
var stackexchange = new Stackexchange({ version: 2.2 });
var config = require('./config');
 
/**
Custom Filters for stackexchange queries can be generated here: https://api.stackexchange.com/docs/questions#order=desc&sort=activity&tagged=alchemyapi&filter=!7qBwspMQR6Dgys4zuNB.8mZ4NHKQX1GRvL&site=stackoverflow&run=true
Returns:
{
      "answers": [
        {
          "body": "<p>Solution was for me to add the current user as depicted in the first two lines of the if block.</p>\n\n<pre><code>def create\n alchemyapi = AlchemyAPI.new()\n response = alchemyapi.combined('url', params[:q],  {'extract'=&gt;'page-image, title, author, concept' })\n puts JSON.pretty_generate(response)\n\nif \n *@user = current_user*\n *@user.documents.create(result: response)*\n flash[:notice] = \"Input was successfully analyzed and persisted.\"\n redirect_to action: 'index'\nelse\n flash[:error] = \"There was a problem analyzing your input.\"\n redirect_to action: 'index'\nend\nend\n</code></pre>\n",
          "comments": [
            {
              "body": "Is this question still valid if you&#39;ve removed references to the problem you mention in the title?"
            }
          ]
        }
      ],
      "comments": [
        {
          "body": "Is this question still valid if you&#39;ve removed references to the problem you mention in the title?"
        }
      ],
      "last_activity_date": 1436589163,
      "question_id": 31334992,
      "link": "http://stackoverflow.com/questions/31334992/associate-current-user-with-json-response-from-api-call-in-rails",
      "title": "Associate current_user with json response from API call in Rails",
      "body": "<p>I need to tie the current user with the json response that I am capturing and storing in PostgreSql 9.4. I am using Rails 4. I am able to successfully store the json in a column 'return' of json data type. I have taken measures to create the model associations and updated the schema, and I have a user model with a record but the user_id remains nil in the Document record holding the json return. I list the controller as I'm nearly convinced that my problem is here.</p>\n\n<pre><code>require 'alchemyAPI/alchemyapi'\nrequire 'json'\n\nclass AlchemyController &lt; ApplicationController\n\ndef index\n  @documents = Document.all\nend\n\ndef create\n  alchemyapi = AlchemyAPI.new()\n  response = alchemyapi.combined('url', params[:q],  {'extract'=&gt;'page-image, title, author, concept' })\n  puts JSON.pretty_generate(response)\n\nif \n  Document.create(result: response)\n  flash[:notice] = \"Input was successfully analyzed and persisted.\"\n  redirect_to action: 'index'\nelse\n  flash[:notice] = \"Input was successfully analyzed and persisted.\"\n  redirect_to action: 'index'\nend\nend\nend\n</code></pre>\n"
    }

**/
var se_filter = '!7qBwspMQR6Dgys4zuNB.8mZ4NHKQX1GRvL'; 


/**
* Run the query and then extract the text value from it to use for AlchemyApi analysis
**/
exports.getStackExchangeText = function getStackExchangeText(keyword, page, callback){
  
  var getObjStr = function getObjStr(parentObj,prop){
    return (parentObj.hasOwnProperty(prop)) ? parentObj[prop] : '';
  };
  
  var extractText = function extractText(items){
    var item,i = 0,j;
    var resultsString = '', tempString;
    
    for (; i < items.length; i++){
      tempString = ''
      item = items[i];
      
      tempString += getObjStr(item, 'title'); //get the question title
      tempString += getObjStr(item, 'body');  //get the question body
      
      //get the question comments
      if (item.hasOwnProperty('comments')){
        for(j=0; j < item.comments.length; j++){
          tempString += getObjStr(item.comments[j], 'body'); // the comment body
        }
      }
      
      //get the question answers
      if (item.hasOwnProperty('answers')){
        for(j=0; j < item.answers.length; j++){
          tempString += getObjStr(item.answers[j], 'body'); // the answer body
          
          // get the answer comments
          if (item.answers[j].hasOwnProperty('comments')){
            for(k=0; k < item.answers[j].comments.length; k++){
              tempString += getObjStr(item.answers[j].comments[k], 'body');
            }
          }
        }
      }
      resultsString += tempString;
    }
    
    callback.call(undefined,resultsString);
  };
  
  this.getStackExchangeData(keyword,page, extractText)
};

/**
* query the stackexchange api for a list of questions related to the keyword.
**/
exports.getStackExchangeData = function getStackExchangeData(keyword, page, callback){
  var allResults = [],
    responseCnt = 0;
    page = page || 1;
      
  function processResults(err, results){
    if (err) throw err;
    
    Array.prototype.push.apply(allResults,results.items);
    
    //if all of our requests have finished...
    responseCnt--;
    if (responseCnt == 0){
      callback.call(undefined,allResults);
    }
  }
  
  //get the questions tagged with the keyword
  var filter = {
    key: config.se_key,
    pagesize: 100,
    page: page,
    tagged: keyword,
    sort: 'activity',
    order: 'desc',
    site: 'stackoverflow',
    filter: se_filter
  };
  responseCnt++;
  stackexchange.questions.questions(filter, processResults);
  
  //get the questions not tagged with the keyword but with the keyword in the body
  var searchFilter = {
    key: config.se_key,
    pagesize: 100,
    page: page,
    q: keyword,
    nottagged: 'alchemyapi',
    sort: 'activity',
    order: 'desc',
    site: 'stackoverflow',
    filter: se_filter
  };
  responseCnt++;
  stackexchange.search.advanced(filter, processResults);
};

