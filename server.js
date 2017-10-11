const stream = require("getstream");
const express = require("express");
require("dotenv").config();

let app = express();


// client = stream.connect(process.env.STREAM_API_KEY, process.env.STREAM_API_SECRET, process.env.STREAM_APP_ID);

// var chris = client.feed("user", "chris")
//
// // chris.addActivity({
// //     actor: "chris",
// //     verb: "add",
// //     object: "picture:10",
// //     foreign_id: "picture:10",
// //     message: "asdfasdfasdfasdfasdf"
// // })
//
// var jack = client.feed('user', 'jack')
// // jack.follow('user', 'chris');
//
// // jack.addActivity({
// //     actor: "jack",
// //     verb: "add",
// //     object: "picture:10",
// //     foreign_id: "picture:10",
// //     message: "this should have been posted to jack's profile"
// // })
//
//
//
// jack.get({
//     limit: 10
// }).then((results) => {
//     console.log("done getting jack's latest followed posts");
//     console.log(results);
// }).catch(err => {
//     console.log(err.error);
// })
//
// // errorObject = new Error("asdfasdfasdf")
// //
// // console.log(errorObject)

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html")
})

app.listen(process.env.PORT, () => {
    console.log(`Listening on ${process.env.PORT}...`);
})
