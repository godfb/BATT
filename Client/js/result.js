var Result = React.createClass({
  render: function() {
            console.log(this.state);
    
    if (this.state.value){
      return (
        <div className="results content">
          {
            this.state.value.data.map(function(item, i){
              return (<Card query={this.state.value.query} data={item} onDoubleclickEvent={this.doubleclickEventHandler} />)
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
  }
});