var path = require('path');
var express = require('express');
var https = require('https');
var http = require('http');
var fs = require('fs');
var bodyParser = require("body-parser");
var requireDir = require('require-dir');
var sql = require('mssql');
var http_port=80;
var https_port=443;

var app = express();


console.log("2. Configurando middleware ...")
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));


console.log("3. Configurando rutas estáticas ...")
//app.use('/', expressJwt({secret: secret}));
//app.use('/', express.static('public'));
app.use('/', express.static(path.join(__dirname, '', 'public')));


console.log("4. Configurando API ...")

var routes = requireDir('./api/');
for (var route in routes){
  app.use('/api/', routes[route]);
}

// Para cualquier otra ruta, devuelve el archivo principal de la aplicación de Angular
app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, '', 'public/index.html'));
});

http.createServer(app).listen(http_port)

console.log("Todo Listo!")

