import child_process from 'child_process';
import fs from 'fs';
import path from 'path';
import url from 'url';

const event = JSON.parse(fs.readFileSync(process.env.GITHUB_EVENT_PATH));

if (process.env.GITHUB_EVENT_NAME !== 'pull_request') {
    console.log('skip: not a pull request');
    process.exit(0);
} else if (process.env.INPUT_SKIP_BOTS === 'true' && event.sender.type !== 'User') {
    console.log('skip: triggered by a bot');
    process.exit(0);
}

const __dirname = path.dirname(url.fileURLToPath(import.meta.url));
const args = [
    '-uS', path.resolve(__dirname, 'bin/main'),
    '--msg', process.env.INPUT_MSG,
    '--pr', event.number.toString(10),
    '--run-id', process.env.GITHUB_RUN_ID,
    '--runtime-token', process.env.ACTIONS_RUNTIME_TOKEN,
    '--runtime-url', process.env.ACTIONS_RUNTIME_URL,
];
try {
    child_process.execFileSync('python3', args, {stdio: 'inherit'});
} catch (e) {
    process.exit(e.status);
}
