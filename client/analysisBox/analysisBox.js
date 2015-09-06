var React = require('react');
var Sentiment = require('./sentiment');
var Keywords = require('./keywords');
var Concepts = require('./concepts');

var AnalysisBox = React.createClass({
  
  render: function() {
    var i, keywordSentiment = '', kwFound = false;
    
    if (typeof this.props.data.keywords !== 'undefined'){
      var keywords = this.props.data.keywords;
      for (i = 0; i < keywords.length; i++){
        if (keywords[i].text.toLowerCase() === this.props.keyword.toLowerCase()){
          kwFound = true;
          keywordSentiment = keywords[i].sentiment;
          break;
        } 
      
      }
      
    }
    
    if (!this.props.data.hasOwnProperty('svc_description'))
      return <div>Loading...</div>;
    
    return (
<div>
      <div>{this.props.data.svc_description}</div>
      <Sentiment data={keywordSentiment}  />
      <Keywords data={this.props.data.keywords} keyword={this.props.keyword}  />
      <Concepts data={this.props.data.concepts} />
      
</div>
    );
  }
  
});

module.exports = AnalysisBox;

//