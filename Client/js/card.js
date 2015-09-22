var Card = React.createClass({
  propTypes: {
    query: React.PropTypes.string.isRequired,
    data: React.PropTypes.string.isRequired,
    empty: React.PropTypes.bool.isRequired,
    handleClick: React.PropTypes.func.isRequired
  },
  render: function() {
    var query = this.props.query;
    var data = this.props.data;
    var empty = this.props.empty;
    var reportLink;
    if (empty){
      reportLink = "";
    }
    else {
      reportLink = <a className="clickMe" onClick={this.handleClick}>Report Acronym</a>;
    }
      return (
      <div className='result col s12 m6 l4'>
        <div id='' className='card blue-grey darken-1'>
          <div className='card-content white-text'>
            <span className='card-title'>{query}</span>
            <p>{data}</p>
          </div>
          <div className='card-action'>
            <p>Autodesk Related</p>
            {reportLink}
          </div>
        </div>
      </div>
    );
  },
  getInitialState: function(){
    return {key:null, value:null};
  },
    handleClick: function() {
      this.props.linkReported(this.props.query, this.props.data); 
    }
});