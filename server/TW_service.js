/**
TE_service.js

A module for querying the twitter API. This uses the publicly available twitter-node-client module.

**/

var Twitter = require('twitter-node-client').Twitter;
var config = require('./config').tw_config;
var twitter = new Twitter(config);


var error = function (err, response, body) {
  throw err;
};

//get the raw data and then extract the text we need for processing in AlchemyAPI
exports.getTwitterSearchTextHTML = function getTwitterSearchTextHTML(keyword, callback){
  var extractText = function extractText(results){
    var resultStr = '',i=0;
    var statuses = results.statuses;
    for (;i < statuses.length; i++){
      resultStr += '<p>' + statuses[i].text + '</p>';
    }
    callback.call(undefined, resultStr);
  };
  
  this.getTwitterSearchData(keyword,extractText);
  
};

//get the raw data from the twitter API
exports.getTwitterSearchData = function getTwitterSearchData(keyword, callback){
  var options = {
    q: keyword,
    count: 100,
    include_entities: false,
    
  };
  twitter.getSearch(options, error, function(results){
    callback.call(undefined, JSON.parse(results));
  });
  
};
