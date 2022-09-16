import Store from "electron-store";
import { Person, Photo } from "types";

interface StoreSchema {
  gallery: Photo[];
  people: Person[];
}
export const store = new Store<StoreSchema>({
  defaults: {
    gallery: [],
    people: [],
  },
});
