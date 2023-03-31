const path = require('path'); // Import the path package
const express = require('express'); // Import the express package
const routes = require('./controllers'); // Import the routes from the controllers folder
const session = require('express-session'); // Import the express-session package
const exphbs = require('express-handlebars'); // Import the express-handlebars package
const helpers = require('./utils/helpers'); // Import the helpers folder



const sequelize = require('./config/connection'); // Import the connection to the database
const SequelizeStore = require('connect-session-sequelize')(session.Store); // Import the connect-session-sequelize package

const app = express();
const PORT = process.env.PORT || 3001;

const hbs = exphbs.create({ helpers }); // Create a new instance of exphbs

// Set up sessions with cookies
const sess = {
  secret: 'Super secret secret',
  cookie: {
    maxAge: 3600000,
    httpOnly: true,
    secure: false,
    sameSite: 'strict'
  },
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  })
};

app.use(session(sess));

// Set Handlebars.js as the default template engine
app.engine('handlebars', exphbs({ defaultLayout: 'main' })); 
app.set('view engine', 'handlebars'); // 


// Express.js middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public'))); // Serve static files from the public folder
app.use(express.urlencoded({ extended: true }));

// Turn on routes
app.use(routes);


sequelize.sync() // Sync the models to the database
  .then(() => {
    app.listen(PORT, () => console.log('Now listening')); // Start the server
  })
  .catch(err => {
    console.log(err);
  });

