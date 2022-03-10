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
	console.log('DoInspect process.env', process.env);
	//console.log('DoInspect WATCHER_INSPECT', process.env.WATCHER_INSPECT);
	//console.log('DoInspect SERVER_INSPECT', process.env.SERVER_INSPECT);
	var out = '';
	if (type == 'SERVER' && process.env.SERVER_INSPECT && typeof process.env.SERVER_INSPECT_PORT != 'undefined') {
		console.log('process.env.SERVER_INSPECT_PORT = ', process.env.SERVER_INSPECT_PORT);
		out = `--inspect=0.0.0.0 --inspect-port=${ServerPort}`;
	} else if (type == 'WATCHER' && process.env.WATCHER_INSPECT && typeof process.env.WATCHER_INSPECT_PORT != 'undefined') {
		console.log('process.env.WATCHER_INSPECT_PORT = ', process.env.WATCHER_INSPECT_PORT);
		out = `--inspect=0.0.0.0 --inspect-port=${WATCHER_INSPECT_PORT}`;
	}
	console.log('DoInspect out', out);
	return out;
}
