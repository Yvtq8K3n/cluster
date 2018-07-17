const cluster = require('cluster');
const http = require('http');
const numCPUs = require('os').cpus().length;

	var options = {
		hostname: '0.0.0.0',//192.168.10.10'
		port: 8080,
		path: '/',
		agent: false  // create a new agent just for this one request	
	};

	if (cluster.isMaster) {
		console.log(`Master ${process.pid} is running`);

		// Fork workers.
		for (let i = 0; i < numCPUs; i++) {
			cluster.fork();
		}

		cluster.on('exit', (worker, code, signal) => {
			console.log(`worker ${worker.process.pid} died`);
		});
	} else {
		// Workers can share any TCP connection
		// In this case it is an HTTP server
		http.get(options);
	  
		http.createServer((req, res) => {
			res.writeHead(200);
			res.end('hello world\n');
		}).listen(8080);
		console.log(`Worker ${process.pid} started`);
	}