import { useEffect, useState } from "react";
import { Photo, Query } from "types";

export const usePhotos = (query: Query) => {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [loading, setLoading] = useState(true);
  const fetch = () => {
    window.electron.ipcRenderer.once("getPhotos", (photos) => {
      setPhotos(photos as Photo[]);
      setLoading(false);
    });
    window.electron.ipcRenderer.sendMessage("getPhotos", query);
  };

  useEffect(fetch, [JSON.stringify(query)]);

  return { photos, reload: fetch, loading };
};
