var NavBar = React.createClass({
  propTypes: {
    batonPass: React.PropTypes.func.isRequired,
    onAcronymRequested: React.PropTypes.func.isRequired
  },
  render: function() {
      return (
	      <nav>
	        <div className="nav-wrapper">
	          <a href="#" className="brand-logo center">BATT</a>
	          <ul id="nav-mobile" className="center right hide-on-med-and-down">
	            <RequestButton onNewResultsAvailable={this.batonPass}/>
	          </ul>
	        </div>
	      </nav>
      	);
  	},
    batonPass: function() {
      console.log("baton passing...")
        if (this.props.onAcronymRequested) {
            this.props.onAcronymRequested();
        }
    }
});