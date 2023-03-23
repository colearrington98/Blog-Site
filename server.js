const path = require('path'); // Import the path package
const sequelize = require('./config/connection'); // Import the connection to the database
const express = require('express'); // Import the express package
const routes = require('./controllers'); // Import the routes from the controllers folder
const homeRoutes = require('./routes/homeRoutes'); // Import the homeRoutes.js file
const userRoutes = require('./routes/userRoutes'); // Import the userRoutes.js file
const blogRoutes = require('./routes/blogRoutes'); // Import the blogRoutes.js file
const commentRoutes = require('./routes/commentRoutes'); // Import the commentRoutes.js file
const session = require('express-session'); // Import the express-session package
const exphbs = require('express-handlebars'); // Import the express-handlebars package




const app = express();
const PORT = process.env.PORT || 3001;

const hbs = exphbs.create({}); // Create a new instance of exphbs


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
app.engine('handlebars', exphbs({ defaultLayout: 'main' })); 
app.set('view engine', 'handlebars'); // 
app.use(express.static(path.join(__dirname, 'public')));// Serve static files from the public folder

// Turn on routes
app.use(routes);
app.use('/', homeRoutes);
app.use('/users', userRoutes);
app.use('/blogs', blogRoutes);
app.use('/comments', commentRoutes);
// app.use(session(sess));

sequelize.sync() // Sync the models to the database
  .then(() => {
    app.listen(PORT, () => console.log('Now listening')); // Start the server
  })
  .catch(err => {
    console.log(err);
  });

