import { Album } from "types";
import { store } from "./store";

export const getAlbums = () => store.get("albums");

export const getAlbum = (id: number) => {
  const albums = getAlbums();
  return albums.find((a) => a.id === id);
};

const defaultAlbum: Omit<Album, "id"> = {
  description: "",
  name: "",
  photos: [],
};

export const createAlbum = (album: Album) => {
  const albums = getAlbums();
  albums.push({ ...defaultAlbum, ...album, id: albums.length + 1 });
  store.set("albums", albums);
};

export const updateAlbum = (album: Album) => {
  const albums = getAlbums();
  const index = albums.findIndex((f) => f.id === album.id);
  if (index > -1) {
    albums[index] = album;
  }
  store.set("albums", albums);
};

export const deleteAlbum = (id: number) => {
  const albums = getAlbums();
  const index = albums.findIndex((f) => f.id === id);
  if (index > -1) {
    albums.splice(index, 1);
  }
  store.set("albums", albums);
};

export const addPhotosToAlbum = (id: number, photos: string[]) => {
  const albums = getAlbums();
  const index = albums.findIndex((f) => f.id === id);
  if (index > -1) {
    albums[index].photos.push(...photos);
  }
  store.set("albums", albums);
};
