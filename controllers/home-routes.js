const router = require('express').Router();
const { Post, User, Comment } = require('../models');

const withAuth = require('../utils/auth');
router.get('/home', (req, res) => {

    res.redirect('/', {
        loggedIn: req.session.loggedIn
    });

});
router.get('/', async (req, res) => {
    try {
        const postsData = await Post.findAll(
            {
                attributes: ["id", "post", "title", "created_at"],
                order: [
                    ["created_at", "DESC"]
                ],
                include: [{
                    model: User,
                    attributes: ["username"],
                },
                {
                    model: Comment,
                    attributes: ["id", "comment_text", "post_id", "user_id", "created_at"],
                    include: {
                        model: User,
                        attributes: ["username"],
                    },
                },
                ],
            }
        );
        const posts = postsData.map((post) => post.get({ plain: true }));
        res.render('home', {
            posts,
            loggedIn: req.session.loggedIn
        });

    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/dashboard');
        return;
    }

    res.render('login');
});

router.get('/signup', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/');

        return;
    }

    res.render('signup');
});

router.get('/dashboard', async (req, res) => {
    if (req.session.loggedIn) {
        try {
            const postsData = await Post.findAll(
                {
                    where: {
                        user_id: req.session.user_id
                    },
                    attributes: ["id", "post", "title", "created_at"],
                    order: [
                        ["created_at", "DESC"]
                    ],
                    include: [{
                        model: User,
                        attributes: ["username"],
                    },
                    {
                        model: Comment,
                        attributes: ["id", "comment_text", "post_id", "user_id", "created_at"],
                        include: {
                            model: User,
                            attributes: ["username"],
                        },
                    },
                    ],
                }
            );
            const posts = postsData.map((post) => post.get({ plain: true }));
            res.render('dashboard', {
                posts,
                loggedIn: req.session.loggedIn
            });

        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    }
    else {
        res.redirect('/login');
    }
});

router.get('/dashboard/new', (req, res) => {
    res.render('new-post');
});
router.get("/post/:id", async (req, res) => {
    try {
        const postData = await Post.findOne({
            where: {
                id: req.params.id,
            },
            attributes: ["id", "post", "title", "created_at"],
            include: [{
                model: User,
                attributes: ["username"],
            },
            {
                model: Comment,
                attributes: ["id", "comment_text", "post_id", "user_id", "created_at"],
                include: {
                    model: User,
                    attributes: ["username"],
                },
            },
            ],
        }

        );
        const post = postData.get({ plain: true });
        res.render('view-post', {
            post,
            loggedIn: req.session.loggedIn
        });
    }
    catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

// router.get('*', (req, res) => {
//     res.status(404).send("Can't go there!");
//     // res.redirect('/');
// })

module.exports = router;