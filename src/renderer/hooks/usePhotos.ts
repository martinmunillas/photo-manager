import { useEffect, useState } from "react";
import { Photo, Query } from "types";

export const usePhotos = (query: Query) => {
  const [photos, setPhotos] = useState<Photo[]>([]);

  useEffect(() => {
    window.electron.ipcRenderer.once("getPhotos", (photos) => {
      setPhotos(photos as Photo[]);
    });
    window.electron.ipcRenderer.sendMessage("getPhotos", query);
  }, [query]);
  return photos;
};
