const sequelize = require('./config/connection');
const express = require('express');
const routes = require('./controllers');
const homeRoutes = require('./routes/homeRoutes');
const userRoutes = require('./routes/userRoutes');
const blogRoutes = require('./routes/blogRoutes');
const commentRoutes = require('./routes/commentRoutes');
const session = require('express-session');



const app = express();
const PORT = process.env.PORT || 3001;

// Express.js session middleware
app.use( 
  session({
    secret: 'Super secret secret',
    resave: false,
    saveUninitialized: true,
  }));

// Express.js middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// Set Handlebars.js as the default template engine
app.use(express.static('public'));

// Turn on routes
app.use(routes);
app.use('/', homeRoutes);
app.use('/users', userRoutes);
app.use('/blogs', blogRoutes);
app.use('/comments', commentRoutes);
// app.use(session(sess));

sequelize.sync()
  .then(() => {
    app.listen(PORT, () => console.log('Now listening'));
  })
  .catch(err => {
    console.log(err);
  });

