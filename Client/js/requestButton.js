var RequestButton = React.createClass({
  propTypes: {
    onNewResultsAvailable: React.PropTypes.func.isRequired,
    handleClick: React.PropTypes.func.isRequired
  },
  render: function() {
      return (
			<li className="menu clickMe" onClick={this.handleClick}>Request Missing Acronym!</li>
      	);
	},
    handleClick: function(itemReactObject) {
      this.props.onNewResultsAvailable(); 
    }
});