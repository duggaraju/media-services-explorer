const { app, BrowserWindow, globalShortcut } = require("electron");
const path = require("path");
const url = require("url");

let appWindow;

function createWindow() {
    appWindow = new BrowserWindow({
        fullscreenable: true,
        "webPreferences": {
            "webSecurity": false,
            "nodeIntegration": false
        }
    });

    let startUrl = process.argv[2] || 'http://localhost:4200/index.html';
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

    appWindow.once('show', () => {
        appWindow.maximize()
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

app.on('browser-window-created', (event, window) => {
    console.log('Window created ' + window.getTitle());
    if (window ===appWindow) {
        window.maximize();
    }
});
