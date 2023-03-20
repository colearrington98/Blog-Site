//build homepage route with handlebars and express router
const router = require('express').Router(); // import the express router
const sequelize = require('../config/connection'); // import the sequelize instance
const { Blog, User, Comment } = require('../models'); // import the Blog, User, and Comment models

//get all posts for homepage
router.get('/', (req, res) => {
  Blog.findAll({
    attributes: [
      'id',
      'title',
      'content',
      'created_at',
    ],
    // include: [
    //   {
    //     model: Comment,
    //     attributes: ['id', 'content', 'blog_id', 'user_id', 'created_at'],
    //     include: {
    //       model: User,
    //       attributes: ['username']
    //     }
    //   },
    //   {
    //     model: User,
    //     attributes: ['username']
    //   }
    // ]
  })
  
    .then(dbBlogData => { //serialize data before passing to template
      //serialize data before passing to template
      const blogs = dbBlogData.map(blog => blog.get({ plain: true }));
      res.json(blogs);
    })
    .catch(err => { //if error, return error
      console.log(err);
      res.status(500).json(err);
    });
});
router.get('/blog/:id', (req, res) => { //get single post
    Blog.findOne({
      where: {
        id: req.params.id
      },
      attributes: [ //only return these attributes
        'id',
        'title',
        'content',
        'created_at',
      ],
      include: [ //include the Comment and User models
        {
          model: Comment,
          attributes: ['id', 'content', 'blog_id', 'user_id', 'created_at'],
          include: {
            model: User,
            attributes: ['username']
          }
        },
        {
          model: User,
          attributes: ['username']
        }
      ]
    })
      .then(dbBlogData => { //if no post found, return error
        if (!dbBlogData) {
          res.status(404).json({ message: 'No post found with this id' });
          return;
        }
        //serialize data before passing to template
        const blog = dbBlogData.get({ plain: true });
        res.json(blog);
      })
      .catch(err => { //if error, return error
        console.log(err);
        res.status(500).json(err);
      });
  });
  

module.exports = router ;
