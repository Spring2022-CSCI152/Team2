require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const mongoose = require('mongoose');
const port = process.env.PORT || 5000;

// body parser to get data from POST requests
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Connection to Mongo
mongoose.connect(process.env.DB, {useNewUrlParser: true});
    mongoose.connection.once('open', function(){
      console.log('Successfully connected to MongoDB');
    }).on('error', function(error){
        console.log('Error is: ', error);
    });


/* // Use API routes from the api folder (un-comment this once we have an api ready
const apis = require("./api");
app.use ("/api", apis);
*/

app.get('/', (req, res) => {
  res.send('Hello World!');
})

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
})