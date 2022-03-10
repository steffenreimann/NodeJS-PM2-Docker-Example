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
	var ServerPort = process.env.SERVER_PORT || '3000';
	var WatcherPort = process.env.WATCHER_PORT || '3001';
	console.log('DoInspect ServerPort = ', ServerPort);
	console.log('DoInspect WatcherPort = ', WatcherPort);
	console.log(__dirname);

	let out = '';
	if (type == 'SERVER') {
		out = `--inspect=0.0.0.0 --inspect-port=${ServerPort}`;
	} else if (type == 'WATCHER') {
		out = `--inspect=0.0.0.0 --inspect-port=${WatcherPort}`;
	}
	console.log('DoInspect out', out);
	return out;
}
