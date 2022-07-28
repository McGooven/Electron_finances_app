const {app, BrowserWindow, ipcMain}=require('electron');
const path = require('path')
const fs = require("fs");

const {create, handleStream} = require('./controller/Founds')

let createWindow = ()=>{
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js')
        }
    });

    ipcMain.on('set-title', create)

    win.loadFile('src/html/index.html');
}

app.whenReady().then(()=>{
    ipcMain.handle('stream:bridge', handleStream)
    createWindow();

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
})