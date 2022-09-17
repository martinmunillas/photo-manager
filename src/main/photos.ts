import { Photo } from "types";
import { commitGallery, getGallery, refreshGallery } from "./gallery";

export const getPhotos = async (search: string) => {
  search = search.toLowerCase();
  await refreshGallery();
  const filtered = getGallery().filter(
    (f) =>
      f.path?.toLocaleLowerCase().includes(search) ||
      f.name?.toLocaleLowerCase().includes(search) ||
      f.description?.toLocaleLowerCase().includes(search) ||
      f.tags?.join("::").toLowerCase().includes(search)
  );

  return filtered;
};

export const updatePhoto = (photo: Photo) => {
  const gallery = getGallery();
  const index = gallery.findIndex((f) => f.path === photo.path);
  if (index > -1) {
    gallery[index] = photo;
  }
  commitGallery(gallery);
};
