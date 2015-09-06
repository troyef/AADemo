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
<div>
      <h1>Keyword: {this.state.keyword}  
      <span className='updatebtn' onClick={this.showUpdateKeywordClick} >update</span>
      </h1>
      { this.state.showUpdateKeyword ? <UpdateKeyword keyword={this.state.keyword} onUpdateKeyword={this.onUpdateKeyword}  /> : null }
      
      
      <h2>Service: Stackoverflow</h2>
      <AnalysisBox data={this.state.stackexchange} keyword={this.state.keyword} />
      <h2>Service: Twitter</h2>
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
      showUpdateKeyword: !this.state.showUpdateKeyword
    });
    
    ApiService.getCombined(defaultKeyword,function(resp){
      this.setState(resp);
    }.bind(this));
  }
  
});

var UpdateKeyword = React.createClass({
  onClick: function onClick(){
    this.props.onUpdateKeyword(React.findDOMNode(this.refs.keyword).value.trim());
  },
  
  render: function render(){
    return (
      <div>
        <input type="text" ref='keyword' defaultValue={this.props.keyword} />
        <button onClick={this.onClick} >Update Keyword</button>
      </div>
    );
  }
});

module.exports = Main;


