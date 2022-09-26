import { contextBridge, ipcRenderer, IpcRendererEvent } from "electron";

export type Channels =
  | "refresh"
  | "getPhotos"
  | "updatePhoto"
  | "toggleFavorite"
  | "addToFavorites"
  | "removeFromFavorites"
  | "getPeople"
  | "getPerson"
  | "updatePerson"
  | "createPerson"
  | "deletePerson"
  | "addPeopleToPhotos"
  | "getAlbums"
  | "getAlbum"
  | "updateAlbum"
  | "addPhotosToAlbum"
  | "createAlbum"
  | "deleteAlbum";

contextBridge.exposeInMainWorld("electron", {
  ipcRenderer: {
    sendMessage(channel: Channels, args: unknown[]) {
      ipcRenderer.send(channel, args);
    },
    on(channel: Channels, func: (...args: unknown[]) => void) {
      const subscription = (_event: IpcRendererEvent, ...args: unknown[]) =>
        func(...args);
      ipcRenderer.on(channel, subscription);

      return () => ipcRenderer.removeListener(channel, subscription);
    },
    once(channel: Channels, func: (...args: unknown[]) => void) {
      ipcRenderer.once(channel, (_event, ...args) => func(...args));
    },
  },
});
