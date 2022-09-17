import { useEffect, useState } from "react";
import { Album } from "types";

export const useAlbums = () => {
  const [albums, setAlbums] = useState<Album[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    window.electron.ipcRenderer.on("albums", (albums) => {
      setAlbums(albums as Album[]);
      setLoading(false);
    });
    window.electron.ipcRenderer.sendMessage("albums");
  }, []);

  return { albums, loading };
};
