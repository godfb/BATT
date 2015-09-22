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
      overlayForm = <RequestForm onAcronymsSubmit={this.destroyOverlay}/>;
    }
    else if (this.state.overlayState === 2){
      overlayClass= "overlay";
      overlayForm = <ReportForm name={this.props.reportName} def={this.props.reportDef} onAcronymsSubmit={this.destroyOverlay}/>;
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
              <Result ref="results" onLinkReported={this.displayLinkReported}/>
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
  },
  displayLinkReported: function(acro, def) {
    this.props.reportName = acro;
    this.props.reportDef = def;
    this.setState({ overlayState: 2 });
  }
});
React.render(
  <Application />,
  document.body
);