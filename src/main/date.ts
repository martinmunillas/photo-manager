import { Photo } from "types";

export interface MyDate {
  year: number;
  month: number;
  day: number;
  hour: number;
  minute: number;
}

export const dateToMyDate = (date: Date): MyDate => {
  return {
    year: date.getFullYear(),
    month: date.getMonth(),
    day: date.getDate(),
    hour: date.getHours(),
    minute: date.getMinutes(),
  };
};

export const filterWithinDate = (
  photos: Photo[],
  first: MyDate | null,
  last: MyDate | null
) => {
  return photos.filter((photo) => {
    const date = photo.date;
    if (first && last) {
      return (
        date.year >= first.year &&
        date.year <= last.year &&
        date.month >= first.month &&
        date.month <= last.month &&
        date.day >= first.day &&
        date.day <= last.day
      );
    } else if (first) {
      return (
        date.year >= first.year &&
        date.month >= first.month &&
        date.day >= first.day
      );
    } else if (last) {
      return (
        date.year <= last.year &&
        date.month <= last.month &&
        date.day <= last.day
      );
    }
    return true;
  });
};

export const getByPeriod = (
  photos: Photo[],
  year: number,
  month?: number,
  day?: number
) => {
  if (day) {
    return photos.filter(
      (photo) =>
        photo.date.year === year &&
        photo.date.month === month &&
        photo.date.day === day
    );
  } else if (month) {
    return photos.filter(
      (photo) => photo.date.year === year && photo.date.month === month
    );
  } else {
    return photos.filter((photo) => photo.date.year === year);
  }
};

export const getAllYears = (photos: Photo[]) => {
  const years = new Set<number>();
  photos.forEach((photo) => years.add(photo.date.year));
  return Array.from(years).sort((a, b) => b - a);
};
