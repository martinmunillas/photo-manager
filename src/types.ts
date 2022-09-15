import { MyDate } from "main/date";

export interface Photo {
  path: string;
  data?: string;
  name: string;
  description: string;
  date: MyDate;
  tags: string[];
  people: People[];
}

export interface People {
  name: string;
  tags: string[];
}
