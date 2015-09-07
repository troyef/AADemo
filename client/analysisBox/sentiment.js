var React = require('react');

var Sentiment = React.createClass({
  
  render: function() {
    var sentimentObj = this.props.data;
    
    var sentimentVal = (sentimentObj.mixed === 1) ? 'mixed' : this.props.data.type;
    
    switch (sentimentVal){
      case 'positive':
        this.styles.sentimentBox.backgroundColor =  'green';
        break;
      case 'negative':
        this.styles.sentimentBox.backgroundColor =  'red';
        break;
      case 'mixed':
      case 'neutral':
        this.styles.sentimentBox.backgroundColor =  'yellow';
        break;
      default:
        this.styles.sentimentBox.backgroundColor =  "#FFF";
        break;
    }
    
    
    return (
      <div style={this.styles.sentimentBox} >
      
      {this.props.data.hasOwnProperty('type') === true ? 
          <span>Overall User Sentiment: <span style={this.styles.sentiment} >{sentimentVal}</span> <span style={this.styles.score} >({this.props.data.score})</span></span>
          : <span>No keyword matches returned for sentiment.</span>
      }
      
      
      </div>
    );
  },
  
  styles : {
    sentimentBox : {
      padding : 20,
      fontSize : 16,
      border: '1px solid #ccc',
      display: 'inline-block',
      marginTop: 5
    },
    sentiment:{
      fontSize : 22,
      fontWeight: 'bold',
      marginLeft : 15
    },
    score:{
      fontSize : 18,
      marginLeft : 15
    }
    
    
    
  }
  
  
  
  
  
});

module.exports = Sentiment;
