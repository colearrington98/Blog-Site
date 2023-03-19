const sequelize = require('../config/connection');
const { User, Blog, Comment } = require('../models');
// Create users
const users = [
  {
    username: 'john_doe',
    password: 'password123'
  },
  {
    username: 'jane_doe',
    password: 'password456'
  },
  {
    username: 'jim_smith',
    password: 'password789'
  }
];

sequelize.sync({ force: true })
  .then(() => User.bulkCreate(users))
  .then(() => {
    // Get users to create blog posts for
    return User.findAll();
  })
  .then((users) => {
    // Create blog posts for each user
    const blogs = [];

    users.forEach((user) => {
      const blog1 = {
        title: 'My First Blog Post',
        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        user_id: user.id
      };

      const blog2 = {
        title: 'My Second Blog Post',
        content: 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        user_id: user.id
      };

      blogs.push(blog1, blog2);
    });

    return Blog.bulkCreate(blogs);
  })
  .then(() => {
    // Get users and blog posts to create comments for
    return Promise.all([
      User.findAll(),
      Blog.findAll()
    ]);
  })
  .then(([users, blogs]) => {
    // Create comments for each blog post and user
    const comments = [];

    blogs.forEach((blog) => {
      const user = users[Math.floor(Math.random() * users.length)];
      const content = `Comment on ${blog.title}`;

      comments.push({
        content: content,
        user_id: user.id,
        blog_id: blog.id
      });
    });

    return Comment.bulkCreate(comments);
  })
  .then(() => {
    console.log('Data created successfully.');
  })
  .catch((error) => {
    console.log('Error creating data:', error);
  });
  
  
  

  