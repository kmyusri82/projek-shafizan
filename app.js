const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const { request } = require('express');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 4000;

//parsing middleware 
//parsing application 
app.use(bodyParser.urlencoded({extended: false}));

//parser application/json
app.use(bodyParser.json());

//static file
app.use(express.static('public'));

//templating engine
app.engine('hbs' , exphbs.engine ( {extname : '.hbs'}));
app.set('view engine' , 'hbs');

//connection pool
const pool = mysql.createPool({

    connectionLimit : 100,
    host            : process.env.DB_HOST,
    user            : process.env.DB_USER,
    password        : process.env.DB_PASS,
    database        : process.env.DB_NAME

});

//connect to DB
pool.getConnection((err, connection) =>{
    if(err) throw err; // not connected
    console.log('Connected as ID' + connection.threadId);
});

//router
const routes = require('./server/routes/user');
app.use('/', routes);

app.listen(port, () => console.log(`Listening on port ${port}`));
