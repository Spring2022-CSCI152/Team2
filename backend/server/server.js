require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const routesUrls = require('../routes/routes');
const userApi = require('../routes/users');
const passport = require('passport');


const cors = require('cors');

const port = process.env.PORT || 5000;

//Connection to Mongo
mongoose.connect(process.env.DB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  });
    mongoose.connection.once('open', function(){
      console.log('Successfully connected to MongoDB');
    }).on('error', function(error){
        console.log('Error is: ', error);
    });

// middlewares
app.use(express.json());
app.use(cors());
app.use(passport.initialize());

// passport config
require('../config/passport')(passport);

// www.blahblahblah/app/signup etc etc etc
app.use('/app', routesUrls);
app.use('/', userApi);

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
})

