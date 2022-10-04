import { useEffect, useState } from "react";
import { Media, Query } from "types";

export const useMedia = (query: Query) => {
  const [media, setMedia] = useState<Media[]>([]);
  const [loading, setLoading] = useState(true);
  const fetch = () => {
    window.electron.ipcRenderer.once("getPhotos", (photos) => {
      setMedia(photos as Media[]);
      setLoading(false);
    });
    window.electron.ipcRenderer.sendMessage("getPhotos", query);
  };

  useEffect(fetch, [JSON.stringify(query)]);

  return { media, reload: fetch, loading };
};
