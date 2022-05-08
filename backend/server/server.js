require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const routesUrls = require('../routes/routes');
const userApi = require('../routes/users');
const funcTest = require('../routes/routetest');
const passport = require('passport');
const cookieParser = require('cookie-parser');


const cors = require('cors');
const { modelName } = require('../models/user');

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
app.use(cors({
  origin: ["http://localhost:3000"],
  credentials: true,
}));
//app.use(passport.initialize());
app.use(cookieParser());

// passport config
require('../config/passport')(passport);

// www.blahblahblah/app/signup routes
app.use('/app', routesUrls);
app.use('/', userApi);
app.use('/api', funcTest);

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
})

