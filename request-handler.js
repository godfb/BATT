var storage = {};
var querystring = require('querystring');
var url = require('url');

console.log(db);

var requestHandler = function(request, response) {

  console.log("Serving request type " + request.method + " for url " + request.url);

  var statusCode = 200;

  if(request.method == "POST"){
    var fullBody = '';
    
    request.on('data', function(chunk) {
      fullBody += chunk.toString();
    });
    
    request.on('end', function() {

      storage[request.url] = storage[request.url] || [];

      storage[request.url].push(JSON.parse(fullBody));
    });
  }
  response.end(JSON.stringify(resObj));
}

var defaultCorsHeaders = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10 // Seconds.
};

exports.requestHandler = requestHandler;