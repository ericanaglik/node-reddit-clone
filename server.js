const express = require('express')
const app = express()
const port = 3000
const exphbs = require('express-handlebars')
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

app.engine('hbs', exphbs({defaultLayout: 'main', extname: '.hbs'}));
app.set('view engine', 'hbs');

app.get('/', (req, res) => res.render('index', {}))

// CREATE POST

app.get('/posts/new', (req, res) => res.render('posts-new'))

app.listen(port, () => console.log(`Example app listening on port ${port}!`))