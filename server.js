require('dotenv').config();
const express = require('express')
const app = express()
const port = 3000
const exphbs = require('express-handlebars')
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator')
var cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
app.use(cookieParser()); 

mongoose.connect('mongodb://localhost/reddit', { useNewUrlParser: true });

app.use(bodyParser.urlencoded({ extended: true }))
app.use(expressValidator())
app.engine('hbs', exphbs({defaultLayout: 'main', extname: '.hbs'}));
app.set('view engine', 'hbs');

var checkAuth = (req, res, next) => {
    console.log("Checking authentication");
    if (typeof req.cookies.nToken === "undefined" || req.cookies.nToken === null) {
      req.user = null;
    } else {
      var token = req.cookies.nToken;
      var decodedToken = jwt.decode(token, { complete: true }) || {};
      req.user = decodedToken.payload;
    }
  
    next();
  };
  app.use(checkAuth);

require('./controllers/posts.js')(app);
require('./data/reddit-db');
require('./controllers/comments.js')(app);
require('./controllers/auth.js')(app);
// require('./controllers/replies.js')(app);


app.listen(port, () => console.log(`Example app listening on port ${port}!`))

module.exports = app;