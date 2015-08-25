var Report = React.createClass({
  render: function() {
    return (
      <div className="formBack row col s12 m8 l6">
        <form className=" formBack col s12 row">
            <div className="browser-default input-field col s4 m3 l2 offset-m2 offset-l3 animated bounceInLeft blurIt white">
                <input placeholder="Enter Your Acronym!" id="acronymBox" type="text" onChange={this.handleChange} className="validate"/>
            </div>
            <div className="browser-default input-field col s8 m5 l4 animated bounceInLeft blurIt white">
                <input placeholder="Enter Your Acronym!" id="acronymBox" type="text" onChange={this.handleChange} className="validate"/>
            </div>
        </form>
      </div>
    )
  }
});