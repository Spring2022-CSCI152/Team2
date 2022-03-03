require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const routesUrls = require('../routes/routes');
const routestest = require('../routes/routetest');
const validateRegisterInput = require('../validation/register');
const validateLoginInput = require('../validation/login');

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

// www.blahblahblah/app/signup etc etc etc
app.use('/app', routesUrls);
app.use('/api', routestest);

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
})

