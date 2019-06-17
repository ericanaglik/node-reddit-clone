const Post = require('../models/post');
const Comment = require('../models/comment');

module.exports = app => {

    // INDEX
    app.get('/', (req, res) => {
        var currentUser = req.user;
        // res.render('home', {});
        console.log(req.cookies);
        Post.find().populate('author')
        .then(posts => {
            res.render('posts-index', { posts, currentUser });
            // res.render('home', {});
        }).catch(err => {
            console.log(err.message);
        })
    })

    //NEW POST FORM
    app.get('/posts/new', (req, res) => {
        res.render('posts-new', {});
    });

    // CREATE
    app.post("/posts/new", (req, res) => {
        if (req.user) {
            var post = new Post(req.body);
            post.author = req.user._id;
            post
                .save()
                .then(post => {
                    return User.findById(req.user._id);
                })
                .then(user => {
                    user.posts.unshift(post);
                    user.save();
                    // REDIRECT TO THE NEW POST
                    res.redirect(`/posts/${post._id}`);
                })
                .catch(err => {
                    console.log(err.message);
                });
        } else {
        return res.status(401); // UNAUTHORIZED
        }
    });


    //SHOW (INDIVIDUAL POST)
    app.get("/posts/:id", function(req, res) {
        // // LOOK UP THE POST
        Post.findById(req.params.id)
          .then(post => {
            res.render("posts-show", { post });
          })
          .catch(err => {
            console.log(err.message);
          });
        // LOOK UP THE POST
        Post.findById(req.params.id).populate('comments').then((post) => {
            res.render('posts-show', { post })
        }).catch((err) => {
            console.log(err.message)
        })
    });

    // SUBREDDIT
    app.get("/n/:subreddit", function (req, res) {
        var currentUser = req.user;
        Post.find({ subreddit: req.params.subreddit }).populate('author')
            .then(posts => {
                res.render("posts-index", { posts, currentUser });
            })
            .catch(err => {
                console.log(err);
            });
    });

};