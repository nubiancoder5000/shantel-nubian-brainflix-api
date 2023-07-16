//server
//final step

const express = require('express') // gets access to http via express library
const videoRouter = require('./routes/videos')
const port = 5000
const server = express() // server is running on express js library
server.get('/', (req, res) => {
    res.json({ "Welcome": "Hello Developers!"});
}

);

server.use('/', videoRouter);

server.listen(port, function () {
        console.log("Your Server is Running");
    }) // server listen to port 5000


