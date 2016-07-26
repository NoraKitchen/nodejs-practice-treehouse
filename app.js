//Problem:  We need a simple way to look at a user's badge count and JS oints
//Solution: Use Node.js to connect to Treehouse's API to get profile information to print out

var http = require("http"); //http module will not be available till you require it, cant use http.get
var username = "norakitchen";

function printMessage(username, badgeCount, points) {
    var message = username + " has" + badgeCount + " total badge(s) and " + points + " points in JavaScript";
    console.log(message);
}

//Connect to he API URL (http://teamtreehouse.com/username.json)
var request = http.get("http://teamtreehouse.com/" + username + ".json", function (response) {
    //****data WILL log here
    //Read the data
    var body = ""; //see below for why this here
    response.on("data", function (chunk) {
        console.log(chunk);
        // console.log("BODY: " + chunk);
        //node.js will send a stream of data-- multiple packets/chunks of body data, so body will actually print a number of times
        //so actually if you want whole body in one chunk...
        body += chunk;
        //when the body is all done coming, it will emit an 'end' event, hence below
    })

    response.on("end", function () {
        //below not working, even logging body not working here*************

        //now you just have a body string, so parse it into json. note json.parse is native js
        // var profile = JSON.parse(body);
        // printMessage(username, profile.badges.length, profile.points.JavaScript);
    })
})

//handle error if http.get not work
request.on("error", function (error) {
    console.error(error.message);
    //all error objs have a message prop
})



//Parse the data
//Print the data