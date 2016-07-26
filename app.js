//remember, this lets your separate js files talk to each other
//the .js at the end of the file name is optional, but the path is not
var profile = require("./profile.js");



//what if instead of prompting in the console for a username you wanted to just type in names when you ran the app
// node app.js norakitchen otherusername etc
//kinda like js in browser always has 'window' and other global objs....
// node.js has a global obj 'process'
//process has a prop called 'argv' that's an array that includes the args typed in when running the app
//the first two items in the array are other stuff you don't want, but can just slice to get actual args

var users = process.argv.slice(2);
users.forEach(profile.get);