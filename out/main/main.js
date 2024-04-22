import { app, BrowserWindow } from "electron";
import path from "path";
import "url";
import __cjs_url__ from "node:url";
import __cjs_path__ from "node:path";
import __cjs_mod__ from "node:module";
const __filename = __cjs_url__.fileURLToPath(import.meta.url);
const __dirname = __cjs_path__.dirname(__filename);
const require2 = __cjs_mod__.createRequire(import.meta.url);
let mainWindow;
function createWindow() {
  mainWindow = new BrowserWindow({
    width: 820,
    height: 650,
    minWidth: 820,
    minHeight: 650
  });
  mainWindow.setMenuBarVisibility(false);
  path.join(
    __dirname,
    "../../out/renderer/index.html"
  );
  const loadURL = "http://localhost:5173";
  mainWindow.loadURL(loadURL);
  mainWindow.on("closed", () => mainWindow = null);
}
app.whenReady().then(() => {
  createWindow();
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
