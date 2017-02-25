'use strict';

const child = require('child_process');

const proc = child.spawn('./main');

proc.stdout.on('data', (data) => {
  console.log('stdout: %s', data);
});

proc.stderr.on('data', (data) => {
  console.log('stderr: %s', data);
});

proc.on('exit', (code, signal) => {
  console.log('exit: code=%s signal=%s', code, signal);
});

proc.on('error', (err) => {
  console.log('error: ', err);
});

