var ReportForm = React.createClass({
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
            <textarea onChange={this.handleChange} placeholder="Tell me what's wrong!" id="textarea1" ref="description" className="maxFidy validate formInput row"></textarea>
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
            url: "/submitReport",
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
                postObject.description = React.findDOMNode(this.refs.description).value;
                postObject.def = this.props.def
                postObject.name = this.props.name
                this.submit(postObject);
            if (this.props.onAcronymsSubmit) {
                this.props.onAcronymsSubmit();
            }
        }
    }
});