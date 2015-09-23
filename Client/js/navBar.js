var NavBar = React.createClass({
  propTypes: {
    onAcronymRequested: React.PropTypes.func.isRequired
  },
  render: function() {
      return (
	      <nav className="yellow darken-3">
	        <div className="navy nav-wrapper">
	          <a className="brand-logo center unselectable">BATT</a>
	          <ul id="nav-mobile" className="center right hide-on-small-only">
	            <DisplayButton onDisplayRequested={this.passDisplayUp}/>
	            <RequestButton onNewResultsAvailable={this.batonPass}/>
	          </ul>
	        </div>
	      </nav>
      	);
  	},
    batonPass: function() {
        if (this.props.onAcronymRequested) {
            this.props.onAcronymRequested();
        }
    },
    passDisplayUp: function() {
        if (this.props.onDisplayRequested()) {
            this.props.onAcronymRequested();
        }
    }
});