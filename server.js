const stream = require("getstream");
const express = require("express");
const bodyParser = require("body-parser");
require("dotenv").config();

let app = express();

app.use(bodyParser.json())

client = stream.connect(process.env.STREAM_API_KEY, process.env.STREAM_API_SECRET, process.env.STREAM_APP_ID);

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html")
});

app.get("/get-timeline/:userID", (req, res) => {
    var userTimelineFeed = client.feed("timeline", req.params.userID)
    userTimelineFeed.get({
        limit: 10
    }).then(results => {
        res.send(results)
    }).catch(err => {
        res.status(500).send(err)
    })
})

app.get("/get-profile/:userID", (req, res) => {
    userProfileFeed = client.feed("profile", req.params.userID)
    userProfileFeed.get({
        limit: 10
    }).then(results => {
        res.send(results)
    }).catch((err) => {
        res.status(500).send(err)
    })
})

app.get("/following", (req, res) => {
    // hardcoding bb-8, because we're just using it as the main user right now
    client.feed("timeline", "bb-8").following().then(results => {
        res.send(results.results)
    }).catch(err => {
        res.status(500).send(err)
    });
})

app.post("/follow/:userID", (req, res) => {
    // again, just using bb-8 right now
    userTimelineFeed = client.feed("timeline", "bb-8")
    userTimelineFeed.follow("profile", req.params.userID).then(results => {
        res.send(results)
    }).catch(err => {
        console.log(err);
        res.status(500).send(err)
    })
})
app.post("/unfollow/:userID", (req, res) => {
    // again, just using bb-8 right now
    userTimelineFeed = client.feed("timeline", "bb-8")
    userTimelineFeed.unfollow("profile", req.params.userID).then(results => {
        res.send(results)
    }).catch(err => {
        console.log(err);
        res.status(500).send(err)
    })
})

app.post("/create-update/:userID", (req, res) => {
    userProfileFeed = client.feed("profile", req.params.userID)
    userProfileFeed.addActivity({
        actor: req.params.userID,
        verb: "posted",
        object: "status",
        statusText: req.body.text
    }).then(data => {
        res.send(data)
    }).catch(err => {
        res.status(500).send(err)
    });
})

app.listen(process.env.PORT, () => {
    console.log(`Listening on ${process.env.PORT}...`);
})
