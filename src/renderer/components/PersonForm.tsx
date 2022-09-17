import { Flex, Input, Button } from "@quaantum/components";
import React, { useEffect, useState } from "react";
import { IoIosSave, IoIosTrash } from "react-icons/io";
import { Person } from "types";
import DefaultProfile from "./DefaultProfile";
import FormControl from "./FormControl";
import TagsManager from "./TagsManager";

interface PersonFormProps {
  person: Partial<Person>;
  onSave?: VoidFunction;
}

const PersonForm: React.FC<PersonFormProps> = ({ person: p, onSave }) => {
  const [person, setPerson] = useState(p);

  useEffect(() => {
    setPerson(p);
  }, [p]);

  const isUpdate = !!person.id;

  const save = () => {
    window.electron.ipcRenderer.sendMessage(
      isUpdate ? "updatePerson" : "createPerson",
      person
    );
    onSave?.();
  };
  return (
    <>
      <Flex w="100%" height="300px" justify="center">
        <DefaultProfile />
      </Flex>
      <FormControl label="Nickname">
        <Input
          value={person.nickname}
          onChange={(e) =>
            setPerson({
              ...person,
              nickname: e.target.value,
            })
          }
        />
      </FormControl>
      <FormControl label="Name">
        <Input
          value={person.name}
          onChange={(e) =>
            setPerson({
              ...person,
              name: e.target.value,
            })
          }
        />
      </FormControl>
      <FormControl label="Tags">
        <TagsManager
          tags={person.tags || []}
          onChange={(t) => setPerson({ ...person, tags: t })}
        />
      </FormControl>
      <Button
        bgColor="primary"
        color="white"
        onClick={save}
        d="flex"
        alignItems="center"
        justifyContent="center"
        gap="8px"
      >
        Save <IoIosSave />
      </Button>
      {isUpdate && (
        <Button
          bgColor="danger"
          color="white"
          onClick={() =>
            window.electron.ipcRenderer.sendMessage("deletePerson", person.id)
          }
          d="flex"
          alignItems="center"
          justifyContent="center"
          gap="8px"
        >
          Delete <IoIosTrash />
        </Button>
      )}
    </>
  );
};

export default PersonForm;
