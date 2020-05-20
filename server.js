// Requiring modules
const express = require('express'),
    mongoose = require('mongoose'),
    places = require('./routes/api/places'),
    users = require('./routes/api/users'),
    auth = require('./routes/api/auth'),
    cors = require('cors'),
    fileUpload = require('express-fileupload'),
    config = require('config');

// Middleware
const app = express();                      // initializing the app
app.use(express.json());                    // giving body-parser as middleware
app.use(cors());                            // cross origin middleware
app.use(fileUpload());                      // file upload
app.use(express.static('client/dist'));     // use images as middleware

// Connect to mongodb
const db = config.get("mongoURI");
mongoose
    .connect(db, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
    .then(() => console.log('Mongodb connected ...'))
    .catch(err => console.log(err));

// routes
app.use('/api/places', places);     // Places
app.use('/api/users', users);     // Users
app.use('/api/auth', auth);     // Users

// start server and listen to port
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server listening to port ${port}`));