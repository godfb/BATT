var NavBar = React.createClass({
  render: function() {
      return (
	      <nav>
	        <div className="nav-wrapper">
	          <a href="#" className="brand-logo center">BATT</a>
	          <ul id="nav-mobile" className="center right hide-on-med-and-down">
	            <li className="menu">About</li>
	          </ul>
	        </div>
	      </nav>
      	);
  	}
});