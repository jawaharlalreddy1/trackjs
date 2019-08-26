
var express = require('express');
//var AirbrakeClient = require('airbrake-js');
//var makeErrorHandler = require('airbrake-js/dist/instrumentation/express');
var TrackJS = require("trackjs-node").TrackJS;

var logger = require('./logger')
TrackJS.install({
    token: "a82c8439f70b44aa8f658805a37cde62",
    application: "titan"
});
var app = express();
app.use(TrackJS.Handlers.expressRequestHandler())

app.get('/', function hello(req, res) {
  //  throw new Error('hello from Express');
    logger.info('test','22','test')  
    console.log('tets')
  res.send('Hello World!');
})
app.get("/foo", (req, res, next) => {
    TrackJS.addMetadata("userName", "Jawaharlal");
    //...
    
    next();
   
   // TrackJS.track(res);
    TrackJS.track(req.headers);
    res.send('Hello World11!');
});
/*
var airbrake = new AirbrakeClient({
    projectId: 241120,
    projectKey: 'd41277b604f2e90c53731cd83238b5b8'
});
*/
//app.use(makeErrorHandler(airbrake));
app.use(logger.expresslogger)
app.use(TrackJS.Handlers.expressErrorHandler({ next: false }))
app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
})

