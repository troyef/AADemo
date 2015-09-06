var React = require('react');

var Sentiment = React.createClass({
  
  render: function() {
    var sentimentObj = this.props.data;
    
    var mixed = (sentimentObj.mixed === 1) ? '- but mixed ' : '';
    
    return (
      <div>Sentiment: {this.props.data.type} {mixed} ({this.props.data.score})</div>
    );
  }
  
});

module.exports = Sentiment;
