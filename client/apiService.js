var $ = require('jquery');

module.exports = {
  getCombined: function getZipWeather(keyword, fn){
    var url = '/api/aa/' + keyword;
    $.ajax({
      url: url,
      success: fn
    });
  }
};