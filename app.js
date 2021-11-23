const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const config = require('./config/database');
const bodyParser = require('body-parser');
const session = require('express-session');

// Connect to db
mongoose.connect(config.database);
const db = mongoose.connection;
db.on('error',console.error.bind(console, 'connection error:'));
db.once('open',()=>{
    console.log('Connected to MongoDB')
});

// Init app
const app = express();

// View engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Set public folder
app.use(express.static(path.join(__dirname, 'public')));

// Body Parser middleware
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

// Express Session middleware
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true }
  }))

// Set routers
const pages = require('./routers/pages.js');
const adminPages = require('./routers/admin_pages.js');
app.use('/admin/pages',adminPages);
app.use('/',pages);

// Start the server
const PORT = 5000;

app.listen(PORT, ()=>{
    console.log(`Server start on port: ${PORT}`);
})
