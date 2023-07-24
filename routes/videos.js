// express is the object that reates the logic for the routes of data
const express = require('express');
const router = express.Router(); //router = mini app
const fs = require('fs');
const {v4: uuidv4} = require('uuid'); // generates a unique ID
const bodyParser = require('body-parser'); //import body parser

router.use(bodyParser.json());// commands executes body parser for json files to the code
const getVideos = () => {
    let data = fs.readFileSync('./data/videos.json')
    return JSON.parse(data)
}
//Req 1: Get an array of Videos

router.get('/videos', function(request, response) {
    const videosArray = getVideos(); // get data from video file and put it into json format
    response.header('Content-Type', 'application/json'); // adds a header to response
    response.json(videosArray); // gets json response to the client
    
});

//Req 2: GET /videos/:id that responds with an object containing the details of the video with an id of :id
//https://sn.com/videos/67
router.get('videos/:id', function(req, res)
{
    const videosArray = getVideos();
    res.header('Content-Type', 'application/json') ;
    
    for (let i = 0; i < videosArray.length; i++) {
        
        if (videosArray[i].id === req.params.id) {
            res.json({video: videosArray[i], message: 'successfully found the video'});
            return;
        }
    }
    res.status(404).json({message: 'Video not Found'});
}) ;


//Req 3: POST /videos that will add a new video to the video list. A unique id must be generated for each video added.
router.post('/videos', (req, res)  => {

  // data should have an attribute called title
    // and channel
    let video = req.body;
    
    // generate a unique id for the video
    const uuid = new uuidv4();

    // put the id on the video
    video.id = uuid;
    // set the image of the video
    video.image = 'https://127.0.0.1:5000/default.png';

    // get the current videos in our videos.json
    // then we add this new one and save all of
    // them back to the same file so that we
    // always have an updated videos array in
    // the file.

    const videosArray = getVideos();
    videosArray.push(video);
    
    // convert the videos array to a string 
    // because we cannot save an actual
    // array object to a file. Files only
    // accept strings.

    const videosArrayString = JSON.stringify(videosArray);

    // fs writes newly stringified data (updated videosArray) to the 
    // videos.json file
    fs.writeFileSync('./data/videos.json', videosArrayString, 'utf8', (error) => {
        
        if(error) {
            // if there is an error
            // send a failure message
            console.log('An error occured while saving the video', error);

            return res.status(500).json({message: 'an error occurred while saving the video'});
        }
        else {
            console.log('successfully saved the video');

            // if there are not errors, then send a successful response
            // with the video
            return res.json({message: 'successfully saved the video', video});
        }
    });

});

module.exports = router; //exporting our mini app to the server


