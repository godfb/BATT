var Report = React.createClass({
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
        return { shouldHide: true };
    },
  render: function() {      
    return (
      <div className="form col s12 m8 l6 highZ">
        <form className="col s12 row">
            <div className="browser-default input-field offset-m2 offset-l3">
                <input placeholder="Acronym" ref="acronymBox" type="text" onChange={this.handleChange} className="validate formInput"/>
            </div>
            <div className="browser-default input-field">
                <input placeholder="Definition (optional)" ref="definitionBox" type="text" className="validate formInput"/>
            </div>
            <div className="browser-default input-field">
                <input placeholder="Context (optional)" ref="contextBox" type="text" className="validate formInput"/>
            </div>
            <div className="browser-default input-field">
                <input placeholder="Email (optional)" ref="emailBox" type="text" className="validate formInput"/>
            </div>
            <a id="submit" onClick={this.handleClick} className={this.props.submitClass}>Submit</a>
        </form>
      </div>
    )
  },
    handleChange: function(event) {
        
        if(event.target.value === "") {
            this.props.submitClass = "disabled waves-effect waves-light btn animated fadeOut";
            this.setState({ shouldHide: true });
        }
        else {
            this.props.submitClass = "waves-effect waves-light btn animated fadeIn";
            this.setState({ shouldHide: false });
        }
  },
      submit: function(submission){
        var returnObj = {};
        var self = this;
        var daDubmission = {"submission": submission}
        $.ajax({
            url: "/submitAcronym",
            type: 'POST',
            data: JSON.stringify(daDubmission),
            contentType: 'application/json',
            success: function (response) {
                //console.log('query successful posted:', response);
            },
            error: function (data) {
              //console.error('failed to post acronym :(');
            },
            complete: function (data) {
              //console.log('finished posting');
            }
        });
    }, 
    handleClick: function(itemReactObject) {
        if (!this.state.shouldHide){
                var postObject = {};
                postObject.Acronym = React.findDOMNode(this.refs.acronymBox).value;
                postObject.Definition = React.findDOMNode(this.refs.definitionBox).value;
                postObject.Context = React.findDOMNode(this.refs.contextBox).value;
                postObject.Email = React.findDOMNode(this.refs.emailBox).value;
                this.submit(postObject);
            if (this.props.onAcronymsSubmit) {
                this.props.onAcronymsSubmit();
            }
        }
    }
});