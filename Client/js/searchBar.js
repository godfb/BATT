var SearchBar = React.createClass({
    propTypes: {
		onNewResultsAvailable: React.PropTypes.func.isRequired,
        onChangeEvent: React.PropTypes.func.isRequired
    },
    render: function() {
        return (
            <div className="col s12 row">
                <div className="browser-default input-field col s6 offset-s3 animated bounceInLeft blurIt white">
                    <input type="text" autocomplete="noautocomplete" placeholder="Enter Your Acronym!" id="acronymBox" onChange={this.handleChange} className="validate"/>
                </div>
            </div>
        );
    },
    search: function(query){
        var returnObj = {};
        var self = this;
        var daQuery = {"query": query}
        $.ajax({
            url: "/search",
            type: 'POST',
            data: JSON.stringify(daQuery),
            contentType: 'application/json',
            success: function (response) {
                // console.log('query successful, recieved:', response);
                if (self.props.onNewResultsAvailable){
                    returnObj.query = response.query
                    returnObj.data = response.data;
                    returnObj.empty = response.empty;
                    // con  sole.log(returnObj);
                    self.props.onNewResultsAvailable(returnObj);
                }
            },
            error: function (data) {
              // console.error('failed to retrieve data.');
            },
            complete: function (data) {
              // console.log('query finished');
            }
        });
    }, 
    handleChange: function(event) {
    if (this.lastTimer){
        clearTimeout(this.lastTimer);
    }
    var self = this;
    var textValue = event.target.value;
    this.lastTimer = setTimeout(function(){
        clearTimeout(self.lastTimer);
        this.lastTimer = null;
        if (!!textValue){
            self.search(textValue);
        }
        else{
            var blankObj = {}
            blankObj.query = "";
            blankObj.data = [];
            self.props.onNewResultsAvailable(blankObj);
        }
    }, 1000);
  },
  onChangeEvent: function() {
        if (this.props.onChangeEvent) {
            this.props.onChangeEvent(this);
        }
    }
});