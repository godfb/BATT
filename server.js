var express = require('express');
var path = require('path');
var bodyParser = require('body-parser')
var data = require("./data.js")

var db = JSON.parse(data);

var app = express();
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/', express.static(__dirname + '/Client'));
app.set('port', process.env.PORT || 3000);

var server = app.listen(app.get('port'), function() {
    console.log('Server listening on port ' + server.address().port);
});

app.post('/search', function(req, res) {
    console.log(req.body);
    if (req.body) {
        console.log(req);
        var obj = req.body;
        
        console.log(obj);

        res.status(200);
        res.send('OK');
        var returnObj = {"some": "thing"};
        res.end(returnObj);
    }else{
        res.sendStatus(400);
    }

});