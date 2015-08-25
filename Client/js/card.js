var Card = React.createClass({
  propTypes: {
    query: React.PropTypes.string.isRequired,
    data: React.PropTypes.string.isRequired,
  },
  render: function() {
    var query = this.props.query;
    var data = this.props.data;
      return (
      <div className='result col s12 m6 l4'>
        <div id='' className='card blue-grey darken-1'>
          <div className='card-content white-text'>
            <span className='card-title'>{query}</span>
            <p>{data}</p>
          </div>
          <div className='card-action'>
            <p>Autodesk Related</p>
            <a>Report Link</a>
          </div>
        </div>
      </div>
    );
  },
  getInitialState: function(){
    return {key:null, value:null};
  },
});