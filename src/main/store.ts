import Store from "electron-store";
import { Album, Person, Media } from "types";

interface StoreSchema {
  gallery: Media[];
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
