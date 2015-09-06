var React = require('react');

var Keywords = React.createClass({
  
  render: function() {
    var pageKeyword = this.props.keyword.toLowerCase();
    var keywordNodes = this.props.data.map(function(keyword, index) {
      if (keyword.text.toLowerCase() !== pageKeyword)
          return (
            <li key={index}>{keyword.text}
              <span className='relevance'>{keyword.relevance}</span>
              <span className='sentiment'>{keyword.sentiment.type}</span>
            </li>
          );
        });
    
    return (
      <ol>
        {keywordNodes}
      </ol>
    );
  }
  
});

module.exports = Keywords;
