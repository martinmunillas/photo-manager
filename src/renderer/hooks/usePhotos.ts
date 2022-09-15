import { useEffect, useState } from "react";
import { Photo } from "types";

export const usePhotos = (search: string) => {
  const [photos, setPhotos] = useState<Photo[]>([]);

  useEffect(() => {
    window.electron.ipcRenderer.once("photos", (arg) => {
      setPhotos(arg as Photo[]);
    });
    window.electron.ipcRenderer.sendMessage("photos", search);
  }, [search]);
  return photos;
};
