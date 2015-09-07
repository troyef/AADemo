var React = require('react');

var Concepts = React.createClass({
  
  defaultRecordCount: 5,
  
  getInitialState: function() {
    return {maxRecords:this.defaultRecordCount};
  },
  
  render: function() {
    var hasMoreData = this.props.data.length > this.defaultRecordCount;
    var conceptNodes = this.props.data.map(function(concept, index){
      if (this.state.maxRecords === -1 || index <= this.state.maxRecords){
          return (
          <li key={index}>
            <a style={this.styles.concept} href={concept.dbpedia} target="_blank" >{concept.text}</a>
            <span style={this.styles.score}>Relevance: {concept.relevance}</span>
          </li>
          );
        }
      }.bind(this));
    return (
      <div style={this.styles.sectionDiv}>
        <div style={this.styles.sectionTitle} >Associated Concepts</div>
        <ol style={this.styles.list} >
          {conceptNodes}
        </ol>
        {hasMoreData === true ? 
          <div style={this.styles.quantityBtn} onClick={this.clickQuantBtn} >{this.state.maxRecords !== this.defaultRecordCount ? 'show fewer' : 'show more'}</div>
          : null }  
        
      </div>
    );
  },
  
  styles : {
    sectionDiv:{
      backgroundColor:'#DDD',
      padding:10,
      margin: '5px 0'
    },
    sectionTitle: {
      fontSize:16,
      fontWeight: 'bold'
    },
    list: {
      listStylePosition: 'inside'
    },
    concept:{
      fontWeight: 'bold',
      color : '#0083c1'
    },
    score:{
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

module.exports = Concepts;
