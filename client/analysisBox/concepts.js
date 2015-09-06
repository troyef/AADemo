var React = require('react');

var Concepts = React.createClass({
  
  render: function() {
    var conceptNodes = this.props.data.map(function(concept, index) {
        return (
          <li key={index}><a href={concept.dbpedia} target="_blank" >{concept.text}</a>
            <span className='relevance'>{concept.relevance}</span>
          </li>
        );
      });
  
    return (
      <ol>
        {conceptNodes}
      </ol>
    );
  }
  
});

module.exports = Concepts;
