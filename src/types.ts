import { MyDate } from "main/date";

export interface Photo {
  path: string;
  data?: string;
  name: string;
  description: string;
  date: MyDate;
  tags: string[];
  people: Person[];
}

export interface Person {
  id: number;
  name: string;
  tags: string[];
}
