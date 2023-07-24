const bodyParser = require('body-parser')

const express = require('express') // gets access to http via express library
const cors = require('cors') 
const port = 5000
const server = express() // server is running on express js library
//server.use(express.json());// command enables server to read json
server.use(bodyParser.urlencoded({extended: true})); // enable raw data to be parsed since consistent errors
server.use(cors())
const videoRouter = require('./routes/videos.js')


server.get('/', (req, res) => {
    res.json({ "Welcome": "Hello Developers!"});
}


);

server.use('/', videoRouter);
server.listen(port, function () {
        console.log("Your Server is Running");
    }) // server listen to port 5000


