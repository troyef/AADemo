var React = require('react');
var AnalysisBox = require('./analysisBox/analysisBox');
var ApiService = require('./apiService');

var Main = React.createClass({
  
  getInitialState: function() {
    var defaultKeyword = 'alchemyapi';
    
    ApiService.getCombined(defaultKeyword,function(resp){
      this.setState(resp);
    }.bind(this));
    
    return {
      keyword: defaultKeyword,
      showUpdateKeyword: false,
      twitter:{},
      stackexchange:{}
    };
  },
  
  render: function render() {
    return (
<div style={this.styles.mainContent} >
      <div style={this.styles.demoTitle} >AlchemyAPI Keyword Analysis</div>
      <div style={this.styles.keywordDiv} >Keyword: <span style={this.styles.keyword} >{this.state.keyword} </span> 
        { this.state.showUpdateKeyword ? <UpdateKeyword keyword={this.state.keyword} onUpdateKeyword={this.onUpdateKeyword} onCancel={this.showUpdateKeywordClick}  /> 
            : <span style={this.styles.updatebtn} onClick={this.showUpdateKeywordClick} >update</span> }
      </div>
      
      
      
      <AnalysisBox data={this.state.stackexchange} keyword={this.state.keyword} />
      <AnalysisBox data={this.state.twitter}  keyword={this.state.keyword} />
      
</div>
    );
  },
  
  showUpdateKeywordClick: function showUpdateKeywordClick(){
    this.setState({showUpdateKeyword: !this.state.showUpdateKeyword});
  },
  onUpdateKeyword: function onUpdateKeyword(newVal){
    this.setState({
      keyword: newVal,
      showUpdateKeyword: !this.state.showUpdateKeyword,
      twitter:{},
      stackexchange:{}
    });
    
    ApiService.getCombined(newVal,function(resp){
      this.setState(resp);
    }.bind(this));
  },
  
  styles:{
    mainContent:{
      width : 960,
      marginLeft : 'auto',
      marginRight : 'auto',
      fontFamily : "'Open Sans', sans-serif"
    },
    demoTitle : {
      fontSize:22,
      padding : '10px 0'
    },
    keywordDiv : {
      fontSize:22,
      padding:'10px 0'
    },
    keyword : {
      fontSize:26,
      fontWeight:'bold'
    },
    updatebtn : { 
      marginLeft: 10,
      color: '#0083c1',
      fontSize: 11
    }
  }
  
});

var UpdateKeyword = React.createClass({
  onClick: function onClick(){
    this.props.onUpdateKeyword(React.findDOMNode(this.refs.keyword).value.trim());
  },
  onCancel: function onClick(){
    this.props.onCancel();
  },
  
  render: function render(){
    return (
      <div >
        <input type="text" ref='keyword' defaultValue={this.props.keyword} />
        <button style={this.styles.updateBtn} onClick={this.onClick} >Update Keyword</button>
        <span style={this.styles.cancelbtn} onClick={this.onCancel} >cancel</span>
      </div>
    );
  },
  
  styles: {
    cancelbtn : { 
      marginLeft: 10,
      color: '#0083c1',
      fontSize: 11
    },
    updateBtn : {
      marginLeft:10
    }
  }
});

module.exports = Main;


