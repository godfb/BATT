var Result = React.createClass({
  render: function() {
      return (
      <div className='result col s6 m4 l3'>
        <div id='' className='card blue-grey darken-1'>
          <div className='card-content white-text'>
            <span className='card-title'>AD</span>
            <p>Autodesk</p>
          </div>
          <div className='card-action'>
            <p>Autodesk Related</p>
            <a>Report Link</a>
          </div>
        </div>
      </div>
    );
  },
  clickEventHandler: function(itemReactObject) {
      this.props.onDoubleclickEvent(itemReactObject);
  },
  displayResults: function(data){
    console.log("data", data);
  },
});