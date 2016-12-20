//  OpenShift sample Node application
var express = require('express'),
	fs      = require('fs'),
	app     = express(),
	path	= require('path'),
//	eps     = require('ejs'),
//	morgan  = require('morgan'),
	busboy  = require('busboy');
	
//Object.assign=require('object-assign')

//app.engine('html', require('ejs').renderFile);
//app.use(morgan('combined'))

var port = process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 8080,
	ip   = process.env.IP   || process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1',
	destino = process.env.OPENSHIFT_DATA_DIR || './destino';


app.get('/', function (req, res) {
  // try to initialize the db on every request if it's not already
  // initialized.
  res.end("HELLO WORLD!!!");
});

app.post('/upload', function(req, res){
  var busboy = new busboy({headers: req.headers});
	
	busboy.on('file', function(fieldname, file, filename, encoding, mimetype){
		var save = path.join(destino, path.basename(fieldname));
		file.pipe(fs.createWriteStream(save));
	});

	busboy.on('finish', function(){
		res.writeHead(200, {'Response': 'Upload com sucesso'});
		res.end("The cake is a lie!");
	});
	return req.pipe(busboy);
});


// error handling
app.use(function(err, req, res, next){
  console.error(err.stack);
  res.status(500).send('Something bad happened!');
});

app.listen(port, ip);
console.log('Server running on http://%s:%s', ip, port);

module.exports = app ;
