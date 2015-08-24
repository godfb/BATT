var Application = React.createClass({
  render: function() {
   return (
      <div className="application">
        <div id="navBar" className="row">
            <NavBar/>
        </div>
        <div id="searchBar" className="row">
            <SearchBar  onNewResultsAvailable={this.displayNewResults} />
        </div>
        <div id="results" className="row">
        </div>
      </div>
    );
  },
  displayNewResults: function(data) {
  	this.refs.results.setState({value:data});
  },
});
React.render(
  <Application />,
  document.body
);

// $(document).ready(function() {
//   console.log("Started from the bottom now we here");
  

//     $('#acronymBox').on('input',function(e){
//         console.log('find me pls');
//         $( '#results' ).append("<div class='result col s6 m4 l3'><div id='' class='card blue-grey darken-1'><div class='card-content white-text'><span class='card-title'>AD</span><p>Autodesk</p></div><div class='card-action'><p>Autodesk Related</p><a>Report Link</a></div></div></div>");
//     });

//     $(".result").click(function(e) {
//         if ($(event.target).is('a')){
//             e.preventDefault();
//             console.log("don't do it, I have so much to give")
//             return;
//         }
//         var $target = $( event.target ).closest( ".result" );
//         if ($target.is('.result')){
//             $target.toggleClass('animated flipOutY');
//             console.log("ayyyyy");
//         }
//     }); 
// });

// else if(request.method === "POST"){
//     request.on('data', function(data){
//         postBody += data;
//     });
//     request.on('end', function(){
//         var message = JSON.parse(postBody.toString());
//         message.objectId = ++objectId;
//         if (parsedURL.pathname === "/classes/messages"){
//             rooms[message.room] = rooms[message.room] || [];
//         rooms[message.room].push(message);
//     }else if(parsedURL.pathname === "/classes/room1"){
//         rooms['room1'] = rooms['room1'] || [];
//         rooms['room1'].push(message);
//     }
//     var headers = defaultCorsHeaders;
//     headers['Content-Type'] = "text/html";
//     response.writeHead(201, headers);
//     response.end();
//     });