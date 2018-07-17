	var http = require('http');
	
	//The reason we cannot use the loopback addres is because we are acessing another machine
	//in this case the server
	var options = {
		hostname: '192.168.10.10',//'0.0.0.0',//192.168.10.10'
		port: 8080,
		path: '/',
		agent: false  // create a new agent just for this one request	
	};

	http.get(options);

	http.createServer(function(req, res) {  
	  res.writeHead(200);
	  res.end("hello world");
	}).listen(8080);