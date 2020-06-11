// Requiring modules
const express = require('express'),
    mongoose = require('mongoose'),
    places = require('./routes/api/places'),
    users = require('./routes/api/users'),
    auth = require('./routes/api/auth'),
    chats = require('./routes/api/chats'),
    cors = require('cors'),
    fileUpload = require('express-fileupload'),
    config = require('config'),
    Chat = require('./models/Chat');

// Middleware
const app = express();                      // initializing the app

// Create server for socket io
const server = require('http').createServer(app);
const io = require('socket.io')(server);

app.use(express.json());                    // giving body-parser as middleware
app.use(cors());                            // cross origin middleware
app.use(fileUpload());                      // file upload
app.use(express.static('client/dist'));     // use images as middleware

// Connect to mongodb
const db = config.get("mongoURI");
const mongoConnect = mongoose
    .connect(db, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
    .then(() => console.log('Mongodb connected ...'))
    .catch(err => console.log(err));

io.on('connection', socket => {
    socket.on('Input Chat Message', data => {
        mongoConnect
            .then(db => {
                try {
                    let chat = new Chat({
                        message: data.chatMessage,
                        sender: data.id,
                        receiver: data.receiverId,
                        type: data.type
                    });

                    chat.save((err, docu) => {
                        if(err) {
                            console.log(err)
                            return;
                        }

                        Chat.find({ "_id": docu._id })
                            .populate("sender")
                            .exec((err, doc) => {
                                return io.emit("Output Chat Message", doc);
                            });
                    });
                } catch (error) {
                    console.error(error);
                }
            })
    })
} )

// routes
app.use('/api/places', places);     // Places
app.use('/api/users', users);       // Users
app.use('/api/auth', auth);         // Auth
app.use('/api/chats', chats);        // Chats

// start server and listen to port
const port = process.env.PORT || 5000;
server.listen(port, () => console.log(`Server listening to port ${port}`));