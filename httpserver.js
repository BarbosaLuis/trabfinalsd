//Lets require/import the HTTP module
var app = express();
var ip_address = process.env.OPENSHIFT_NODEJS_IP;

//Lets define a port we want to listen to
const PORT=process.env.OPENSHIFT_NODEJS_PORT || 8080; 

//We need a function which handles requests and send response
function handleRequest(request, response){
    response.end('It Works!! Path Hit: ');
}

//Create a server
var server = app.createServer(handleRequest);

//Lets start our server
server.listen(PORT, ip_address, function(){
    //Callback triggered when server is successfully listening. Hurray!
    console.log("Server listening on: http://localhost:");
});	