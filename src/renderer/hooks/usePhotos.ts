import { useEffect, useState } from "react";
import { Photo, Query } from "types";

export const usePhotos = (query: Query) => {
  const [photos, setPhotos] = useState<Photo[]>([]);

  useEffect(() => {
    window.electron.ipcRenderer.once("getPhotos", (arg) => {
      setPhotos(arg as Photo[]);
    });
    window.electron.ipcRenderer.sendMessage("getPhotos", query);
  }, [query]);
  return photos;
};
