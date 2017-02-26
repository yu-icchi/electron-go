'use strict';

const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const ipcMain = electron.ipcMain;

const child = require('child_process');

let win;

function createWindow() {
  win = new BrowserWindow({width: 800, height: 600});
  win.loadURL('file://' + __dirname + '/index.html');
  win.webContents.openDevTools();
  win.on('close', () => {
    win = null;
  });
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (win === null) {
    createWindow();
  }
});

ipcMain.on('exec', (event, i, s, b) => {
  const args = ['-int', i || 0, '-string', s || ''];
  if (b) {
    args.push('-bool');
  }
  const proc = child.spawn('./main', args, {stdio: ['pipe', 'pipe', process.stderr]});
  proc.stdout.on('data', (data) => {
    event.sender.send('exec_callback', data.toString());
  });
  proc.on('error', (err) => {
    console.log(err);
  });
  proc.on('close', (code) => {
    event.sender.send('exec_callback', 'code: ' + code);
  });
});
