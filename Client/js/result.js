var Result = React.createClass({
  propTypes: {
    onLinkReported: React.PropTypes.func.isRequired
  },
  render: function() {    
    if (this.state.value){
      return (
        <div className="results content">
          {
            this.state.value.data.map(function(item, i){
              return (<Card query={this.state.value.query} linkReported={this.batonPass} empty={this.state.value.empty} data={item} onDoubleclickEvent={this.doubleclickEventHandler} />)
            }, this)
          }
        </div>
      );
    }
    else{
      return <div className="results content"/>
    }
  },
  clickEventHandler: function(itemReactObject) {
      this.props.onDoubleclickEvent(itemReactObject);
  },
  getInitialState: function(){
    return {value:null};
  },
  handleChange: function(event) {
    this.setState({value: event.target.value});
  },
    batonPass: function(query, def) {
        if (this.props.onLinkReported) {
            this.props.onLinkReported(query, def);
        }
    }
}); 