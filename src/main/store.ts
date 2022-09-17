import Store from "electron-store";
import { Album, Person, Photo } from "types";

interface StoreSchema {
  gallery: Photo[];
  people: Person[];
  albums: Album[];
}
export const store = new Store<StoreSchema>({
  defaults: {
    gallery: [],
    people: [],
    albums: [],
  },
});
