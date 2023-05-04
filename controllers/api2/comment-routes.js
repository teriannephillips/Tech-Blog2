const router = require('express').Router();
const { Post, User, Comment } = require('../../models');

const withAuth = require('../../utils/auth');


//Get all comments
router.get("/", (req, res) => {
    Comment.findAll()
        .then((dbCommentData) => res.json(dbCommentData))
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
});

//Create a comment
router.post('/', (req, res) => {
    if (req.session.loggedIn) {
        Comment.create({
                comment_text: req.body.comment,
                post_id: req.body.postId,
                user_id: req.session.user_id
            })
            .then(dbCommentData => res.json(dbCommentData))
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    }
    else {
        res.status(401).json(err);
    }
});




module.exports = router;