var Application = React.createClass({
  getInitialState: function() {
      return { 
        overlayState: 0
      };
  },
  render: function() {
    var overlayForm;
    var overlayClass= "";
    if (this.state.overlayState === 1){
      overlayClass= "overlay";
      overlayForm = <Report onAcronymsSubmit={this.destroyOverlay}/>;
    }
    else if (this.state.overlayState === 2){
      overlayClass= "overlay";
      overlayForm = "";
    }
    else{
      overlayForm = "";
    }
    
    return (
        <div className="application">
          <div id="navBar" className="row">
              <NavBar onAcronymRequested={this.displayAcronymRequested}/>
          </div>
          <div id="overlay" onClick={this.overlayClicked} className={overlayClass}>
            {overlayForm}
          </div>
          <div id="searchBar" className="row">
              <SearchBar  onNewResultsAvailable={this.displayNewResults} />
          </div>
          <div className="row">
              <Result ref="results"/>
          </div>
        </div>
    );
  },
  overlayClicked: function() {
    if (event.target.id === "overlay"){
      this.destroyOverlay();
    }
  },
  getInitialState: function() {
    return {showAcronymRequest: false};
  },
  displayNewResults: function(data) {
  	this.refs.results.setState({value:data});
  },
  displayAcronymRequested: function() {
    this.setState({ overlayState: 1 });
  },
  destroyOverlay: function() {
    this.setState({ overlayState: 0 });
  }
});
React.render(
  <Application />,
  document.body
);