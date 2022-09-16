import { Person } from "types";
import { store } from "./store";

export const getPeople = () => store.get("people");

export const addPerson = (person: Person) => {
  const people = getPeople();
  people.push({ ...person, id: people.length + 1 });
  store.set("people", people);
};

export const editPerson = (person: Person) => {
  const people = getPeople();
  const index = people.findIndex((f) => f.id === person.id);
  if (index > -1) {
    people[index] = person;
  }
  store.set("people", people);
};

export const deletePerson = (id: number) => {
  const people = getPeople();
  const index = people.findIndex((f) => f.id === id);
  if (index > -1) {
    people.splice(index, 1);
  }
  store.set("people", people);
};
