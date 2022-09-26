import { Photo, Query } from "types";
import { getAlbum } from "./albums";
import { filterOnExactDate, filterWithinDate } from "./date";
import { commitGallery, getGallery, refreshGallery } from "./gallery";
import { getPeople } from "./people";

export const getPhotos = async (query?: Query) => {
  await refreshGallery();
  let photos = getGallery();
  if (!query) return photos;
  if (query.albumId) {
    const album = getAlbum(query.albumId);
    if (album) {
      photos = photos.filter((p) => album.photos.includes(p.path));
    }
  }
  if (query.search) {
    const search = query.search.toLowerCase();
    photos = photos.filter(
      (f) =>
        f.path?.toLocaleLowerCase().includes(search) ||
        f.name?.toLocaleLowerCase().includes(search) ||
        f.description?.toLocaleLowerCase().includes(search) ||
        f.tags?.join("::").toLowerCase().includes(search) ||
        getPeople()
          .filter((person) => f.people.includes(person.id))
          .map((person) => person.name.toLowerCase())
          .join("::")
          .includes(search)
    );
  }

  if (query.exactDate) {
    photos = filterOnExactDate(photos, query.exactDate);
  } else if (query.startDate || query.endDate) {
    photos = filterWithinDate(
      photos,
      query.startDate || null,
      query.endDate || null
    );
  }

  if (query.people?.length) {
    photos = photos.filter((p) =>
      p.people.some((p) => query.people?.includes(p))
    );
  }

  if (query.favorite !== undefined) {
    photos = photos.filter((p) => p.favorite === query.favorite);
  }

  return photos;
};

export const updatePhoto = (photo: Photo) => {
  const gallery = getGallery();
  const index = gallery.findIndex((f) => f.path === photo.path);
  if (index > -1) {
    gallery[index] = photo;
  }
  commitGallery(gallery);
};

export const addToFavorites = (photos: string[]) => {
  const gallery = getGallery();
  gallery.forEach((p) => {
    if (photos.includes(p.path)) {
      p.favorite = true;
    }
  });
  commitGallery(gallery);
};

export const toggleFavorite = (photo: string) => {
  const gallery = getGallery();
  const index = gallery.findIndex((f) => f.path === photo);
  if (index > -1) {
    gallery[index].favorite = !gallery[index].favorite;
  }
  commitGallery(gallery);
};

export const removeFromFavorites = (photos: string[]) => {
  const gallery = getGallery();
  gallery.forEach((p) => {
    if (photos.includes(p.path)) {
      p.favorite = false;
    }
  });
  commitGallery(gallery);
};
