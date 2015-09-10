var RequestButton = React.createClass({
  propTypes: {
    onNewResultsAvailable: React.PropTypes.func.isRequired,
    handleClick: React.PropTypes.func.isRequired
  },
  render: function() {
      return (
			<li className="menu" onClick={this.handleClick}>Request Missing Acronym!</li>
      	);
	},
    handleClick: function(itemReactObject) {
      console.log("ayy lmao");
      this.props.onNewResultsAvailable(); 
    }
});