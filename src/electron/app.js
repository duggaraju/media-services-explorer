const { app, BrowserWindow, globalShortcut } = require("electron");
const path = require("path");
const url = require("url");

let appWindow;

function createWindow() {
    appWindow = new BrowserWindow({
        width: 800,
        height: 800,
        minWidth: 700,
        minHeight: 700,
        fullscreenable: true,
        "web-preferences": {
            "web-security": false,
            "node-integration": false
        }
    });

    let startUrl = 'http://localhost:4200/index.html';
    /*
    let startUrl = url.format({
        pathname: path.join(__dirname, 'index.html'),
        protocol: 'file:',
        slashes: true
        });
    */
    appWindow.loadURL(startUrl); 

    globalShortcut.register('CmdOrCtrl+Shift+D', ()=> {
        appWindow.webContents.toggleDevTools();
    });

    appWindow.on('closed', () => {
        appWindow = null;
    });
}
app.on('ready', createWindow);

app.on('window-all-closed', () => {
    globalShortcut.unregisterAll();
    if (process.platform !== 'darwin') {
        app.quit()
    }
});

app.on('activate', () => {
    if (appWindow === null) {
        createWindow();
    }
});
