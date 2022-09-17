import { Album } from "types";
import { store } from "./store";

export const getAlbums = () => store.get("albums");

export const addAlbum = (album: Album) => {
  const albums = getAlbums();
  albums.push({ ...album, id: albums.length + 1 });
  store.set("albums", albums);
};

export const editAlbum = (album: Album) => {
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
