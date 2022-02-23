module.exports = {
	apps: [
		{
			name: 'NodeJS Webhook',
			script: './Watcher/webhook.js',
			watch: false,
			env: {
				NODE_ENV: 'development'
			}
		}
	]
};
