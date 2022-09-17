import { useEffect, useState } from "react";
import { Person } from "types";

export const usePeople = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    window.electron.ipcRenderer.on("getPeople", (people) => {
      setPeople(people as Person[]);
      setLoading(false);
    });
    window.electron.ipcRenderer.sendMessage("getPeople");
  }, []);

  return { people, loading };
};
