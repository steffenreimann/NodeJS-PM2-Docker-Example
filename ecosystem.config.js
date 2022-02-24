module.exports = {
	apps: [
		{
			name: 'NodeJS Webhook',
			script: `./Watcher/webhook.js `,
			watch: false,
			env: {
				NODE_ENV: 'development'
			}
		},
		{
			name: 'NodeJS Server',
			script: `./Server/app.js `,
			watch: false,
			env: {
				NODE_ENV: 'development'
			}
		}
	]
};

function DoInspect(type) {
	console.log('DoInspect WATCHER_INSPECT', process.env.WATCHER_INSPECT);
	console.log('DoInspect SERVER_INSPECT', process.env.SERVER_INSPECT);
	let out = '';
	if (type == 'SERVER') {
		out = `--inspect=0.0.0.0 --inspect-port=${process.env.SERVER_INSPECT_PORT}`;
	} else if (type == 'WATCHER') {
		out = `--inspect=0.0.0.0 --inspect-port=${process.env.WATCHER_INSPECT_PORT}`;
	}
	console.log('DoInspect out', out);
	return out;
}
