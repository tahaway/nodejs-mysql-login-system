// app.js

// set up ======================================================================
// get all the tools we need
var express  = require('express');
var session  = require('express-session');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var app      = express();
var port     = process.env.PORT || 3000;



// Session Secret Key
app.use(session({secret: 'New##123'}));



// configuration ===============================================================
// connect to our database via knex & bookshelf
require('./app/server/modules/knexbookshelf'); // pass passport for configuration


// Models
require('./app/server/models/models'); // pass passport for configuration


app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser.urlencoded({
	extended: true
}));
app.use(bodyParser.json());

// Template Folder 
var theme = 'default';

// Template Engine 
app.set('views', __dirname + '/app/server/views/'+theme+'/');
app.set('view engine', 'ejs'); // set up ejs for templating

// Public Direcotry setting
app.use(express.static('/app/public'));

// routes ======================================================================
require('./app/server/routes/routes')(app,knex,bookshelf);

// launch ======================================================================
app.listen(port);
console.log('App is running on http://localhost:' + port);
	