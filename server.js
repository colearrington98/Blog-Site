const sequelize = require('./config/connection');
const express = require('express');
const routes = require('./controllers');

const app = express();
const PORT = process.env.PORT || 3001;

// Express.js middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Turn on routes
app.use(routes);
// app.use(session(sess));

sequelize.sync()
  .then(() => {
    app.listen(PORT, () => console.log('Now listening'));
  })
  .catch(err => {
    console.log(err);
  });


