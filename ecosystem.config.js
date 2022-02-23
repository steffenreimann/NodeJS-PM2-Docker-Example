module.exports = {
	apps: [
		{
			name: 'NodeJS Webhook',
			script: './webhook.js',
			watch: false,
			env: {
				NODE_ENV: 'development'
			}
		},
		{
			name: 'NodeJS Server',
			script: '../Server/app.js',
			watch: false,
			env: {
				NODE_ENV: 'development'
			}
		}
	]
};
