const { app, BrowserWindow, ipcMain, shell } = require('electron');
const path = require('path');
const fs = require('fs');


const USER_DIR = app.getPath('userData');
const CONFIG_PATH = path.join(USER_DIR, 'config.json');


function createWindow () {
    const win = new BrowserWindow({
        width: 1280,
        height: 720,
        backgroundColor: '#000000', // keeps boot visually clean
        show: false, // reveal after ready-to-show
        webPreferences: { preload: path.join(__dirname, 'preload.js') },
    });


    win.once('ready-to-show', () => win.show());
    win.loadFile('index.html'); // index.html should load the client bundle
}


app.whenReady().then(() => {
    createWindow();
    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow();
    });
});


app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
});


// Persist/restore settings as JSON in userData
ipcMain.handle('config:load', () => {
    try { return JSON.parse(fs.readFileSync(CONFIG_PATH, 'utf8')); }
    catch { return {}; }
});


ipcMain.handle('config:save', (e, data) => {
    fs.writeFileSync(CONFIG_PATH, JSON.stringify(data, null, 2));
    return true;
});


// Placeholder: allows the renderer to trigger an app relaunch/self-launch if needed in the future. Returns a simple ok result.
ipcMain.handle('cl:launch', async () => {
    return { ok: true };
});