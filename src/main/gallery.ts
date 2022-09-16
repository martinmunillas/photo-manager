import Store from "electron-store";
import im from "imagemagick";

const ignore = [".DS_Store"];

interface StoreSchema {
  gallery: Photo[];
}
const store = new Store<StoreSchema>();

import { readdirSync, readFileSync } from "fs";
import { join } from "path";
import { Photo } from "types";
import { dateToMyDate } from "./date";

export const getImage = (path: string) => {
  return `data:image/png;base64,${readFileSync(path).toString("base64")}`;
};

const getNestedFiles = (dir: string, fileList: string[] = []) => {
  try {
    const files = readdirSync(dir, { withFileTypes: true });
    for (const file of files) {
      if (file.isFile() && !ignore.includes(file.name)) {
        fileList.push(join(dir, file.name));
      } else if (file.isDirectory()) {
        getNestedFiles(join(dir, file.name), fileList);
      }
    }
    return fileList;
  } catch (error) {
    console.log(error);
    return [];
  }
};

interface ImageMeta {
  exif?: {
    dateTimeOriginal?: string;
    pixelXDimension?: string;
    pixelYDimension?: string;
    resolutionUnit?: number;
    userComment?: string;
    xResolution?: string;
    yResolution?: string;
    orientation?: number;
  };
}

let gallery: Photo[] = [];

export const getGallery = () => gallery;

const genGallery = async () => {
  try {
    const all = getNestedFiles(join(__dirname, "../../../../Desktop/YES"));
    const saved = store.get("gallery", []);
    for (const path of all) {
      const found = saved.find((f) => f.path === path);
      if (!found) {
        const data = await new Promise<ImageMeta>((resolve, reject) => {
          im.readMetadata(path, (err, meta) => {
            if (err) {
              reject(err);
            }
            resolve(meta);
          });
        });
        saved.push({
          path,
          tags: [],
          date: dateToMyDate(
            new Date(data.exif?.dateTimeOriginal || Date.now())
          ),
          description: data.exif?.userComment || "",
          name: "",
          people: [],
          data: getImage(path),
        });
      }
    }
    return saved;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const refreshGallery = async () => {
  gallery = await genGallery();
};

export const commitGallery = (g: Photo[]) => {
  store.set("gallery", g);
  gallery = g;
};
