/**


**/

var se_service = require('./server/SE_service');
var aa = require('./server/AA_service');
var fs = require('fs');
var tw_service = require('./server/TW_service');

/*
se_service.getStackExchangeText('alchemyapi',null,function(results){
  console.log(results);  
  fs.writeFile('se_results.html', '<html>' + results + '</html>');
});
*/
/*
tw_service.getTwitterSearchTextHTML('alchemyapi',function(results){
  console.log(results);
  fs.writeFile('tw_results.html', '<html>' + results + '</html>');  
});
*/

aa.getCombinedAnalysis('alchemyapi', function(results){
  console.log(JSON.stringify(results));
});


