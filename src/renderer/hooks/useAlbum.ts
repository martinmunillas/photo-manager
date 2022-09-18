import { useEffect, useState } from "react";
import { Album } from "types";

export const useAlbum = (id: number) => {
  const [album, setAlbum] = useState<Album | null>(null);

  useEffect(() => {
    const getAlbum = async () => {
      window.electron.ipcRenderer.on("getAlbum", (album) => {
        setAlbum(album as Album);
      });
      window.electron.ipcRenderer.sendMessage("getAlbum", id);
    };
    getAlbum();
  }, [id]);

  return album;
};
