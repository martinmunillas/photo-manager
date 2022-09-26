import path from "path";
import { app, BrowserWindow, shell, ipcMain } from "electron";
import { autoUpdater } from "electron-updater";
import log from "electron-log";
import MenuBuilder from "./menu";
import { resolveHtmlPath } from "./util";
import { refreshGallery } from "./gallery";
import {
  deletePerson,
  updatePerson,
  getPeople,
  createPerson,
  getPerson,
  addPeopleToPhotos,
} from "./people";
import {
  createAlbum,
  deleteAlbum,
  updateAlbum,
  getAlbums,
  addPhotosToAlbum,
  getAlbum,
} from "./albums";
import {
  addToFavorites,
  getPhotos,
  toggleFavorite,
  updatePhoto,
} from "./photos";
import { Query } from "types";

class AppUpdater {
  constructor() {
    log.transports.file.level = "info";
    autoUpdater.logger = log;
    autoUpdater.checkForUpdatesAndNotify();
  }
}

let mainWindow: BrowserWindow | null = null;

ipcMain.on("refresh", async () => {
  refreshGallery();
});

ipcMain.on("getPhotos", async (event, query: Query) => {
  const p = await getPhotos(query);
  event.reply("getPhotos", p);
});

ipcMain.on("updatePhoto", (_, photo) => {
  updatePhoto(photo);
});

ipcMain.on("getPeople", (event) => {
  event.reply("getPeople", getPeople());
});

ipcMain.on("getPerson", (event, id) => {
  event.reply("getPerson", getPerson(id));
});

ipcMain.on("createPerson", (_, person) => {
  createPerson(person);
});

ipcMain.on("updatePerson", (_, person) => {
  updatePerson(person);
});

ipcMain.on("deletePerson", (_, id) => {
  deletePerson(id);
});

ipcMain.on("getAlbums", (event) => {
  event.reply("getAlbums", getAlbums());
});

ipcMain.on("getAlbum", (event, id) => {
  event.reply("getAlbum", getAlbum(id));
});

ipcMain.on("createAlbum", (_, album) => {
  createAlbum(album);
});

ipcMain.on("updateAlbum", (_, album) => {
  updateAlbum(album);
});

ipcMain.on("addPhotosToAlbum", (_, { album, photos }) => {
  addPhotosToAlbum(album, photos);
});

ipcMain.on("addPeopleToPhotos", async (_, { people, photos }) => {
  console.log(people, photos);
  addPeopleToPhotos(people, photos);
});

ipcMain.on("deleteAlbum", (_, id) => {
  deleteAlbum(id);
});

ipcMain.on("addToFavorites", (_, photos) => {
  addToFavorites(photos);
});

ipcMain.on("toggleFavorite", (_, photo) => {
  toggleFavorite(photo);
});

if (process.env.NODE_ENV === "production") {
  const sourceMapSupport = require("source-map-support");
  sourceMapSupport.install();
}

const isDebug =
  process.env.NODE_ENV === "development" || process.env.DEBUG_PROD === "true";

if (isDebug) {
  require("electron-debug")();
}

const installExtensions = async () => {
  const installer = require("electron-devtools-installer");
  const forceDownload = !!process.env.UPGRADE_EXTENSIONS;
  const extensions = ["REACT_DEVELOPER_TOOLS"];

  return installer
    .default(
      extensions.map((name) => installer[name]),
      forceDownload
    )
    .catch(console.log);
};

const createWindow = async () => {
  if (isDebug) {
    await installExtensions();
  }

  const RESOURCES_PATH = app.isPackaged
    ? path.join(process.resourcesPath, "assets")
    : path.join(__dirname, "../../assets");

  const getAssetPath = (...paths: string[]): string => {
    return path.join(RESOURCES_PATH, ...paths);
  };

  mainWindow = new BrowserWindow({
    show: false,
    width: 1024,
    height: 728,
    icon: getAssetPath("icon.png"),
    webPreferences: {
      sandbox: false,
      preload: app.isPackaged
        ? path.join(__dirname, "preload.js")
        : path.join(__dirname, "../../.erb/dll/preload.js"),
    },
  });

  mainWindow.loadURL(resolveHtmlPath("index.html"));

  mainWindow.on("ready-to-show", () => {
    if (!mainWindow) {
      throw new Error('"mainWindow" is not defined');
    }
    if (process.env.START_MINIMIZED) {
      mainWindow.minimize();
    } else {
      mainWindow.show();
    }
  });

  mainWindow.on("closed", () => {
    mainWindow = null;
  });

  const menuBuilder = new MenuBuilder(mainWindow);
  menuBuilder.buildMenu();

  // Open urls in the user's browser
  mainWindow.webContents.setWindowOpenHandler((edata) => {
    shell.openExternal(edata.url);
    return { action: "deny" };
  });

  // Remove this if your app does not use auto updates
  // eslint-disable-next-line
  new AppUpdater();
};

/**
 * Add event listeners...
 */

app.on("window-all-closed", () => {
  // Respect the OSX convention of having the application in memory even
  // after all windows have been closed
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app
  .whenReady()
  .then(() => {
    createWindow();
    app.on("activate", () => {
      // On macOS it's common to re-create a window in the app when the
      // dock icon is clicked and there are no other windows open.
      if (mainWindow === null) createWindow();
    });
  })
  .catch(console.log);
