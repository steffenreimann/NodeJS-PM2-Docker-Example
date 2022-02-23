const express = require('express');
const app = express();
const port = process.env.GIT_WEBHOOK_PORT || 3000;
var pm2 = require('pm2');
const simpleGit = require('simple-git');
var path = require('path');
const { exit } = require('process');

process.env.GIT_WEBHOOK = '/';

const exePath = process.cwd();
const serverExePath = path.join(exePath, '../', 'Server');

console.log('Git Webhook started', process.env.GIT_WEBHOOK);
console.log('exePath = ', process.cwd());
console.log('serverExePath = ', serverExePath);

app.get(process.env.GIT_WEBHOOK, (req, res) => {
	gitpull();
	res.status(200).end();
	res.send('Hello World!');
});

app.listen(port, () => {
	console.log(`Example app listening on port ${port}`);
});

pm2.connect(function(err) {
	if (err) {
		console.error(err);
	} else {
		console.log('PM2 Connected');

		pm2.list((err, list) => {
			console.log(err, list);

			/* pm2.restart('api', (err, proc) => {
				// Disconnects from PM2
				pm2.disconnect();
			}); */
		});

		//console.log(pm2.list());
		gitpull();
	}
});

const SimpleGitServer = simpleGit(serverExePath);
//const GITHUB_LINK = process.env.GITHUB_LINK;
const GITHUB_LINK = 'https://github.com/steffenreimann/NodeJS-Server-Example.git';
const GITHUB_BRANCH = 'main';

async function gitpull() {
	console.log('git pull');

	var pullRes = await SimpleGitServer.pull(GITHUB_LINK, GITHUB_BRANCH);

	console.log('git pull done! pullRes = ', pullRes);

	if (pullRes.summary.changes > 0) {
		console.log('git pull done! restart server');
		pm2.restart('./ecosystem.config.js', (err, proc) => {
			console.log('pm2.restart err = ', err);
			console.log('pm2.restart proc = ', proc);
			////console.log(proc)
		});
	}

	//console.log(process.env.GITHUB_LINK);

	/* 	require('simple-git')()
		.exec(() => console.log('Starting pull...'))
		.pull(GITHUB_LINK, GITHUB_BRANCH, (err, update) => {
			console.log(err);
			console.log(update);
			updatee = update;
		})
		.exec(() => {
			if (updatee.summary.changes > 0) {
				console.log('Restart Server...');
				
				egClient.logout().then(function(params) {
					////console.log('logout+')
				});
			} else {
				console.log('Server no restart...');
			}
		}); */
}
