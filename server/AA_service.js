var AlchemyAPI = require('./alchemyapi');
var alchemyapi = new AlchemyAPI();

var configUrl = require('./config').urlBase;

var doRequest = function doRequest(url, callback){
  alchemyapi.combined("url", url, 
    {
      extract:'title,keyword,concept',
      sentiment: 1
      //showSourceText: 1
    }, callback);
  
};

//Combine both of our individual service queries for a single trip back to the client.
exports.getCombinedAnalysis = function getCombinedAnalysis(keyword, callback){
  
  var twFinished = false, seFinished = false;
  var result = {};
  
  this.getTwitterAnalysis(keyword,function(resp){
    result.twitter = resp;
    twFinished = true;
    if (seFinished){
      callback.call(undefined, result);
    }  
  });
  
  this.getStackexchangeAnalysis(keyword,function(resp){
    result.stackexchange = resp;
    seFinished = true;
    if (twFinished){
      callback.call(undefined, result);
    }  
  });
};

//Use the url flavor of the combined analysis API. Point the AA server to a url that this server's endpoints will be build for it.
//We're also adding in some service specific info for the web endpoint.

exports.getTwitterAnalysis = function getTwitterAnalysis(keyword, callback){
  var tw_url = configUrl + 'api/tw' + encodeURIComponent(keyword) + '/text';
  doRequest(tw_url,function(resp){
    resp.svc_title = 'Twitter';
    resp.svc_description = 'AlchemyApi language analysis performed on a search of the last 100 tweets that mention the specified keyword. '
    callback.call(undefined, resp);
  });
};


exports.getStackexchangeAnalysis = function getCombinedAnalysis(keyword, callback){
  var se_url = configUrl + 'api/tw' + encodeURIComponent(keyword) + '/text';
  doRequest(se_url,function(resp){
    resp.svc_title = 'Stackoverflow';
    resp.svc_description = 'AlchemyApi language analysis performed on a search of the last 100 Stachoverflow questions that mention the specified keyword or are tagged with the keyword. '
    callback.call(undefined, resp);
  });
};



