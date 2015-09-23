var DisplayForm = React.createClass({
  propTypes: {
    onAcronymsSubmit: React.PropTypes.func.isRequired,
    handleClick: React.PropTypes.func.isRequired
  },
    getDefaultProps: function() {
        return {
            submitClass: 'hidden disabled waves-effect waves-light btn animated'
        };
    },
    getInitialState: function() {
        return { 
            shouldHide: true,
            displayAcronyms: this.requestAcronyms()
         };
    },
  render: function() {
    return (
      <div className="form col s12 m8 l6 highZ">
        <form className="col s12 row">
            <textarea disabled onChange={this.handleChange} id="textarea1" value={this.state.displayAcronyms} ref="description" className="maxFidy vertFidy formInput row"></textarea>
        </form>
      </div>
    )
  },
      requestAcronyms: function(){
          var self = this;
        $.ajax({
            url: "/requestAll",
            type: 'GET',
            contentType: 'application/json',
            success: function (response) {
                console.log('query successful, returned:', response);
                
                var displayString = "";
                for (var key in response){
                    for (var innerKey in response[key]){
                        displayString += key + ": " + response[key][innerKey] + String.fromCharCode(13);
                    }
                }
                //console.log(displayString);
                self.setState({ displayAcronyms: displayString });
            },
            error: function (data) {
              console.error('failed get acronyms :(');
            },
            complete: function (data) {
              console.log('finished request');
            }
        });
    }
});