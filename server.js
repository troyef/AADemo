var express = require('express'),
  http = require('http'),
  app = express();

var se_service = require('./server/SE_service');
var tw_service = require('./server/TW_service');
var aa_service = require('./server/AA_service');


app.set('port', Number(process.env.PORT || 3001));
app.use(express.static(__dirname +  '/public'));
/*app.use(function(req, res) {
   res.status(404).send("404: You look lost.");
});*/

app.get('/api/se/:keyword/text', function(req, res){
  
  console.log('Getting text results from SE for keyword: ' + req.params.keyword);
  se_service.getStackExchangeText(req.params.keyword, null, function(results){
    res.send('<html>' + results + '</html>');  
  });
  
});

app.get('/api/se/:keyword', function(req, res){
  
  console.log('Getting results from SE for keyword: ' + req.params.keyword);
  se_service.getStackExchangeData(req.params.keyword, null, function(results){
    res.send(results);  
  });
  
});

app.get('/api/tw/:keyword/text', function(req, res){
  
  console.log('Getting text results from Twitter for keyword: ' + req.params.keyword);
  tw_service.getTwitterSearchTextHTML(req.params.keyword, function(results){
    res.send('<html>' + results + '</html>');  
  });
  
});

app.get('/api/tw/:keyword', function(req, res){
  
  console.log('Getting results from Twitter for keyword: ' + req.params.keyword);
  tw_service.getTwitterSearchData(req.params.keyword, function(results){
    res.send(results);  
  });
  
});

app.get('/api/aa/:keyword', function(req, res){
  
  console.log('Getting results from AlchemyApi for keyword: ' + req.params.keyword);
  aa_service.getCombinedAnalysis(req.params.keyword, function(results){
    res.type('application/json');
    res.send(results);  
  });
  
});


http.createServer(app).listen(app.get('port'), function(){
    console.log('Express server listening on port ' + app.get('port'));
});