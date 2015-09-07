var React = require('react');
var Sentiment = require('./sentiment');
var Keywords = require('./keywords');
var Concepts = require('./concepts');

var AnalysisBox = React.createClass({
  
  render: function() {
    console.log(this.props.data);
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
      return (
          <div style={this.styles.analysisBox} >
            <div>Loading...</div>
          </div>
      );
    
    return (
<div style={this.styles.analysisBox} >
      <div style={this.styles.serviceTitle} >{this.props.data.svc_title}</div>
      <div style={this.styles.serviceDesc} >{this.props.data.svc_description}</div>
  
      <Sentiment data={keywordSentiment}  />
      <Keywords data={this.props.data.keywords} keyword={this.props.keyword}  />
      <Concepts data={this.props.data.concepts} />
      
</div>
    );
  },
  
  styles: {
    analysisBox: {
      border: '1px solid #ccc',
      padding: '10px 20px',
      marginBottom : 20
    },
    serviceTitle: { 
      fontSize:22,
      fontWeight:'bold',
      padding:'5px 0'
    },
    serviceDesc: {
      fontSize:12,
      fontStyle: 'italic',
      marginBottom:10
    }
  }
  
});

module.exports = AnalysisBox;

//