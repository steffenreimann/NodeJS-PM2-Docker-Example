module.exports = {
	apps: [
		{
			name: 'NodeJS Webhook',
			script: `./Watcher/webhook.js ${DoInspect('WATCHER')}`,
			watch: false,
			env: {
				NODE_ENV: 'development'
			}
		},
		{
			name: 'NodeJS Server',
			script: `./Server/app.js ${DoInspect('SERVER')}`,
			watch: false,
			env: {
				NODE_ENV: 'development'
			}
		}
	]
};

function DoInspect(type) {
	//console.log('DoInspect WATCHER_INSPECT', process.env.WATCHER_INSPECT);
	//console.log('DoInspect SERVER_INSPECT', process.env.SERVER_INSPECT);
	//console.log(__dirname);
	walk(__dirname, function(err, results) {
		if (err) {
			console.log('Error', err);
		} else {
			console.log('Results', results);
		}
	});

	let out = '';
	if (type == 'SERVER') {
		out = `--inspect=0.0.0.0 --inspect-port=${process.env.SERVER_INSPECT_PORT}`;
	} else if (type == 'WATCHER') {
		out = `--inspect=0.0.0.0 --inspect-port=${process.env.WATCHER_INSPECT_PORT}`;
	}
	console.log('DoInspect out', out);
	return out;
}

var fs = require('fs');
var path = require('path');
var walk = function(dir, done) {
	var results = [];
	fs.readdir(dir, function(err, list) {
		if (err) return done(err);
		var pending = list.length;
		if (!pending) return done(null, results);
		list.forEach(function(file) {
			file = path.resolve(dir, file);
			fs.stat(file, function(err, stat) {
				if (stat && stat.isDirectory()) {
					walk(file, function(err, res) {
						results = results.concat(res);
						if (!--pending) done(null, results);
					});
				} else {
					results.push(file);
					if (!--pending) done(null, results);
				}
			});
		});
	});
};
