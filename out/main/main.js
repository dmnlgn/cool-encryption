"use strict";
const electron = require("electron");
let mainWindow;
function createWindow() {
  mainWindow = new electron.BrowserWindow({
    width: 820,
    height: 600,
    minWidth: 820,
    minHeight: 600
  });
  mainWindow.setMenuBarVisibility(false);
  mainWindow.loadURL("http://localhost:5173");
  mainWindow.on("closed", () => mainWindow = null);
}
electron.app.whenReady().then(() => {
  createWindow();
});
electron.app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    electron.app.quit();
  }
});
electron.app.on("activate", () => {
  if (mainWindow == null) {
    createWindow();
  }
});
