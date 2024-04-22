import { app, BrowserWindow } from "electron";
import path from "path";
import url from "url";

let mainWindow: BrowserWindow | null;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 820,
    height: 650,
    minWidth: 820,
    minHeight: 650,
  });
  mainWindow.setMenuBarVisibility(false);

  const rendererHTMLPath = path.join(
    __dirname,
    "../../out/renderer/index.html"
  );

  const isDev = import.meta.env.VITE_APP_DEV === "true";
  const loadURL = isDev
    ? "http://localhost:5173"
    : url.format({
        pathname: rendererHTMLPath,
        protocol: "file:",
        slashes: true,
      });

  mainWindow.loadURL(loadURL);
  mainWindow.on("closed", () => (mainWindow = null));
}

app.whenReady().then(() => {
  createWindow();
  // mainWindow?.webContents.openDevTools();
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (mainWindow == null) {
    createWindow();
  }
});
