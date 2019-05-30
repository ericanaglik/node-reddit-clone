const express = require('express')
const app = express()
const port = 3000
const exphbs = require('express-handlebars')
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');

// Set db
require('./data/reddit-db');

mongoose.connect('mongodb://localhost/reddit', { useNewUrlParser: true });

app.use(bodyParser.urlencoded({ extended: true }))
app.use(expressValidator())
app.engine('hbs', exphbs({defaultLayout: 'main', extname: '.hbs'}));
app.set('view engine', 'hbs');

const Post = mongoose.model('Post', {
  title: String,
  body: String
})

app.get('/', (req, res) => {
  Post.find()
    .then(posts => {
      res.render('posts-index', {posts: posts})
    })
    .catch(err => {
      console.log(err)
    })
})

// CREATE POST

app.get('/posts/new', (req, res) => res.render('posts-new', {}))

// CREATE
app.post('/posts', (req, res) => {
  Post.create(req.body).then((post) => {
    console.log(post)
    res.redirect('/')
  }).catch((err) => {
    console.log(err.message)
  })
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))