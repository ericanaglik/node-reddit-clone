const express = require('express')
const app = express()
const port = 3000
const exphbs = require('express-handlebars')
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');

mongoose.connect('mongodb://localhost/reddit', { useNewUrlParser: true });

app.use(bodyParser.urlencoded({ extended: true }))
app.use(expressValidator())
app.engine('hbs', exphbs({defaultLayout: 'main', extname: '.hbs'}));
app.set('view engine', 'hbs');

require('./controllers/posts.js')(app);
require('./data/reddit-db');
// require('./controllers/comments.js')(app);
// require('./controllers/auth.js')(app);
// require('./controllers/replies.js')(app);


app.listen(port, () => console.log(`Example app listening on port ${port}!`))