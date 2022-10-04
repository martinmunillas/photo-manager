import im from "imagemagick";

const ignore = [".DS_Store"];

import { readdirSync } from "fs";
import { join } from "path";
import { Media } from "types";
import { dateToMyDate } from "./date";
import { store } from "./store";

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

let gallery: Media[] = [];

export const getGallery = () => gallery;

export const GALLERY_FOLDER = join(__dirname, "../../../../Desktop/YES");

const videoExtesions = [".mp4", ".mov", ".avi", ".mkv", ".flv", ".wmv"];

const genGallery = async () => {
  try {
    // store.clear();
    const all = getNestedFiles(GALLERY_FOLDER);
    const saved = store.get("gallery");
    for (const path of all) {
      const found = saved.find((f) => f.path === path);
      const isVideo = videoExtesions.includes(path.slice(-4).toLowerCase());
      if (!found) {
        saved.push({
          path,
          src: `http://localhost:8900/${path.split(GALLERY_FOLDER)[1]}`,
          tags: [],
          type: isVideo ? "video" : "image",
          date: dateToMyDate(
            new Date(
              (!isVideo &&
                (
                  await new Promise<ImageMeta>((resolve, reject) => {
                    im.readMetadata(path, (err, meta) => {
                      if (err) {
                        reject(err);
                      }
                      resolve(meta);
                    });
                  })
                ).exif?.dateTimeOriginal) ||
                Date.now()
            )
          ),
          description: "",
          name: "",
          people: [],
          favorite: false,
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

export const commitGallery = (g?: Media[]) => {
  store.set("gallery", g ?? gallery);
  if (g) {
    gallery = g;
  }
};
