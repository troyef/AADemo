var React = require('react');

var Keywords = React.createClass({
  defaultRecordCount: 5,
  
  getInitialState: function() {
    return {maxRecords:this.defaultRecordCount};
  },
  
  render: function() {
    var pageKeyword = this.props.keyword.toLowerCase();
    var keywordNodes = this.props.data.map(function(keyword, index) {
      if (keyword.text.toLowerCase() !== pageKeyword && (this.state.maxRecords === -1 || index <= this.state.maxRecords))
          return (
            <li key={index}>
              <span style={this.styles.keyword}>{keyword.text}</span>
              <span style={this.styles.score}>Relevance: {keyword.relevance}</span>
              <span style={this.styles.sentiment}>Sentiment: {keyword.sentiment.type}</span>
            </li>
          );
        }.bind(this));
    
    return (
      <div style={this.styles.sectionDiv}>
        <div style={this.styles.sectionTitle} >Associated Keywords</div>
        <ol style={this.styles.list} >
          {keywordNodes}
        </ol>
        <div style={this.styles.quantityBtn} onClick={this.clickQuantBtn} >{this.state.maxRecords !== this.defaultRecordCount ? 'show fewer' : 'show more'}</div>
      </div>
    );
  },
  
  styles : {
    sectionDiv:{
      backgroundColor:'#DDD',
      padding:10,
      margin: '10px 0'
    },
    sectionTitle: {
      fontSize:16,
      fontWeight: 'bold'
    },
    list: {
      listStylePosition: 'inside'
    },
    keyword:{
      fontWeight: 'bold'
    },
    score:{
      marginLeft:10
    },
    sentiment:{
      marginLeft:10
    },
    quantityBtn:{
      fontSize : 12,
      color : '#0083c1',
      padding: '3px 15px 0'
    }
  },
  
  //either set to the default amount or -1
  clickQuantBtn: function clickQuantBtn(){
    this.setState({maxRecords:this.state.maxRecords !== this.defaultRecordCount ? this.defaultRecordCount : -1 });
  }
  
});

module.exports = Keywords;
