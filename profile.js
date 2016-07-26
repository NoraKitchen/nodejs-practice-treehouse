//Problem:  We need a simple way to look at a user's badge count and JS oints
//Solution: Use Node.js to connect to Treehouse's API to get profile information to print out

var https = require("https"); //https module will not be available till you require it, cant use http.get
var http = require("http"); //had to require this too because status_code info is not included in https, see below


function printMessage(username, badgeCount, points) {
    var message = username + " has " + badgeCount + " total badge(s) and " + points + " points in JavaScript";
    console.log(message);
}

//handle errors
function printError(error) {
    console.error(error.message);
    //all error objs have a message prop
}


function get(username) {
    //Connect to he API URL (http://teamtreehouse.com/username.json)
    var request = https.get("https://teamtreehouse.com/" + username + ".json", function (response) {

        var body = ""; //see below for why this here

        //Read the data
        response.on("data", function (chunk) {
            // console.log("BODY: " + chunk);
            //node.js will send a stream of data-- multiple packets/chunks of body data, so body will actually print a number of times
            //so actually if you want whole body in one chunk...
            body += chunk;
            //when the body is all done coming, it will emit an 'end' event, hence below
        });

        response.on("end", function () {
            //now you just have a body string, so parse it into json. note json.parse is native js

            if (response.statusCode === 200) {
                try {
                    var profile = JSON.parse(body);
                    printMessage(username, profile.badges.length, profile.points.JavaScript);
                } catch (error) {
                    //parse error
                    printError(error);
                }
            } else {
                //statusCode error
                printError({ message: "There was an error getting the profile for " + username + ". (" + http.STATUS_CODES[response.statusCode] + ")" });
                //if the status code isn't the expected 200 (say 404 not found or 301 like you were getting before when using http instead of https)
                //will print this error. the usual error message isn't very user-friendy, so http.STATUS_Codes[codehere/e.g.404] accesses short descriptions of http status codes that are slightly more friendly("Not found")
            }
        });
    })
//connection error
request.on("error", printError);
};

//make get function available outside module
module.exports.get = get;