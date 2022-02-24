const express = require('express');
const app = express();
const port = process.env.GIT_WEBHOOK_PORT;
var pm2 = require('pm2');
const simpleGit = require('simple-git');
var path = require('path');

const WatcherExePath = path.resolve(path.join(process.cwd(), 'Watcher'));
const ServerExePath = path.resolve(path.join(process.cwd(), 'Server'));

const SimpleGitServer = simpleGit(ServerExePath);
const SimpleGitWatcher = simpleGit(WatcherExePath);

console.log('Git Webhook started', process.env.GIT_WEBHOOK);
console.log('WatcherExePath = ', WatcherExePath);
console.log('ServerExePath = ', ServerExePath);

app.get(process.env.GIT_WEBHOOK, (req, res) => {
	//gitpull();
	res.send('Hello World!');
	//res.status(200).end();
});

app.listen(port, () => {
	console.log(`Watcher Running ... the webhook address for Github is ... `);
	console.log(`http://h2899502.stratoserver.net:${port}/${process.env.GIT_WEBHOOK}`);
});

pm2.connect(function(err) {
	if (err) {
		console.error(err);
	} else {
		console.log('PM2 Connected');

		pm2.list((err, list) => {
			//console.log(err, list);
			/* pm2.restart('api', (err, proc) => {
				// Disconnects from PM2
				pm2.disconnect();
			}); */
		});

		//console.log(pm2.list());
		//gitpull();
	}
});

async function gitpull(options) {
	console.log('git pull');
	var pullRes = await options.git.pull(options.remote, options.branch);
	return pullRes.summary.changes > 0 ? true : false;
}

async function init() {
	if (process.env.WATCHER_UPDATE_ONSTART) {
		const options = {
			git: SimpleGitWatcher,
			branch: 'main',
			remote: 'https://github.com/steffenreimann/NodeJS-PM2-Docker-Example.git'
		};
		var WatcherChanges = await gitpull(options);
	}
	if (process.env.SERVER_UPDATE_ONSTART) {
		const options = {
			git: SimpleGitServer,
			branch: process.env.GITHUB_BRANCH,
			remote: process.env.GITHUB_LINK
		};
		var ServerChanges = await gitpull(options);
	}

	if (WatcherChanges || ServerChanges) {
		pm2.restart('./ecosystem.config.js', (err, proc) => {
			console.log('pm2.restart err = ', err);
			console.log('pm2.restart proc = ', proc);
			//console.log(proc)
		});
	}
}

init();
