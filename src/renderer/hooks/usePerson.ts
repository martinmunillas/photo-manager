import { useEffect, useState } from "react";
import { Person } from "types";

export const usePerson = (id: number) => {
  const [person, setPerson] = useState<Person | null>(null);

  useEffect(() => {
    const getPerson = async () => {
      window.electron.ipcRenderer.on("getPerson", (person) => {
        setPerson(person as Person);
      });
      window.electron.ipcRenderer.sendMessage("getPerson", id);
    };
    getPerson();
  }, [id]);

  return person;
};
