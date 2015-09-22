var NavBar = React.createClass({
  propTypes: {
    onAcronymRequested: React.PropTypes.func.isRequired
  },
  render: function() {
      return (
	      <nav>
	        <div className="nav-wrapper">
	          <a className="brand-logo center unselectable">BATT</a>
	          <ul id="nav-mobile" className="center right hide-on-small-only">
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
    }
});