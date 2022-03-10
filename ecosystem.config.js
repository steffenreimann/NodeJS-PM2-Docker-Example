module.exports = {
	apps: [
		{
			name: 'NodeJS Webhook',
			script: `./Watcher/webhook.js --inspect-brk=0.0.0.0 --inspect-port=8070`,
			watch: false,
			env: {
				NODE_ENV: 'development'
			}
		},
		{
			name: 'NodeJS Server',
			script: `./Server/app.js --inspect-brk=0.0.0.0 --inspect-port=8071`,
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
	let out = '';
	if (type == 'SERVER') {
		let ServerPort = process.env.SERVER_PORT || '3000';
		console.log('process.env.SERVER_PORT = ', process.env.SERVER_PORT);
		console.log('DoInspect ServerPort = ', ServerPort);
		out = `--inspect=0.0.0.0 --inspect-port=${ServerPort}`;
	} else if (type == 'WATCHER') {
		let WatcherPort = process.env.WATCHER_PORT || '3001';
		console.log('process.env.WATCHER_PORT = ', process.env.WATCHER_PORT);
		console.log('DoInspect WatcherPort = ', WatcherPort);
		out = `--inspect=0.0.0.0 --inspect-port=${WatcherPort}`;
	}
	console.log('DoInspect out', out);
	return out;
}
