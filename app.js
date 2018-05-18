var http = require("http");
var fs = require("fs");
var url = require("url");

http.createServer(function (request, response)
{
    var pathname = url.parse(request.url).pathname.substring(1);
    console.log("Request for " + pathname + " received.");    
    fs.readFile(pathname, function (err, data)
    {
        if(err)
        {
            console.log(err);
            response.writeHead(404, {"Content-Type": "text/html"});
        }
        else{
            response.writeHead(200, {"Content-Type": "text/html"});
            if(request.method == "POST"){
                request.on("data", function(qstr){
                    var qobj = qs.parse(qstr.toString());

                    response.write(data.toString());
                    response.write("\n<script>data = " + JSON.stringify(qobj) + ";</script>\n");
                    response.end();
                });
            }
            else{
                
                response.write(data.toString());
            }
            response.end();
        }
        
    });
}).listen(8081);


console.log("Server running at http://127.0.0.1:8081");
    
    




//fs means file server, refers to server, not computer
//asynchronous, so Program Ended shows up first while waiting for readFile