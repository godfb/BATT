var DisplayButton = React.createClass({
  propTypes: {
    onDisplayRequested: React.PropTypes.func.isRequired,
    handleClick: React.PropTypes.func.isRequired
  },
  render: function() {
      return (
			<li className="menu clickMe" onClick={this.handleClick}>Display All Acronyms!</li>
      	);
	},
    handleClick: function(itemReactObject) {
      this.props.onDisplayRequested(); 
    }
});