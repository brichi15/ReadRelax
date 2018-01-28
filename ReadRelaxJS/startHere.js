const express = require('express');
const bodyParser = require('body-parser');
// logs our requests to the server
const logger = require('morgan')('dev');
const path = require('path');
const fs = require('fs');

// NEED to SERVE up a file to the server from here, the file will be index.html
// once that's served up, the file runs a script that listens for the gesture objects and that changes the text file 

const app = express(); // creates the express object

app.use( bodyParser.json() )

app.use( logger ); // make a logger so we know how long everything is taking

app.get('/', ( req, res, next ) => { // now we're serving a get requests for when the user accesses the port
	res.sendFile( path.join(__dirname, "frontEnd.html")); // serve up our frontEnd.html file
});

app.get('/frontEnd.js', ( req, res, next ) => {
	res.sendFile( path.join(__dirname, "frontEnd.js"));
})

app.post('/', ( req, res, next ) => { // serve our post request 
	const body = req.body;
	const speed = body.speed;

	fs.writeFile( "input.txt", speed.toString(), ( err ) => {  // now we can fs
		console.log( err );
		fs.readFile("input.txt", ( err, doc ) => {
			console.log( doc.toString());
		})
	});

	res.json({
		msg: "Gesture Received!!!!!"
	});
})

app.listen(8080, () => { console.log("On port 8080")}); // keep listening on that port for more user requests