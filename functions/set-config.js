/* eslint-disable import/no-dynamic-require */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-param-reassign */

// this script is not being used, it'`s just for the record
// add to package.json scripts
//  "config:set": "node ./env/set-config",
//  "config:set:dev": "node ./env/set-config dev",

const fs = require('fs');
const path = require('path');

const env = process.argv[2];

const configPath = path.resolve(
  __dirname,
  env ? `.env.${env}.json` : '.env.json',
);

if (!(configPath && fs.existsSync(configPath))) {
  console.error(`File '${configPath}' not found.`);
  return;
}

const collectConfigLines = (o, propPath, configLines) => {
  propPath = propPath || '';
  configLines = configLines || [];
  for (const key of Object.keys(o)) {
    const newPropPath = propPath + key;
    if (typeof o[key] === 'object') {
      collectConfigLines(o[key], `${newPropPath}.`, configLines);
    } else if (o[key] != null && o[key] !== '') {
      configLines.push(`${newPropPath}=${JSON.stringify(o[key])}`);
    }
  }
};

const config = require(configPath);
const configLines = [];
collectConfigLines(config, '', configLines);

const cp = require('child_process');

const keysValues = configLines.join(' ');

let cmd = 'firebase';
if (env) {
  cmd += ` -P ${env}`;
}
cmd += ` functions:config:set ${keysValues}`;

console.log(cmd);
cp.execSync(cmd);
