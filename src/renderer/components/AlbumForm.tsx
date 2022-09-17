import { Flex, Input, Button, TextArea } from "@quaantum/components";
import React, { useEffect, useState } from "react";
import { IoIosSave, IoIosTrash } from "react-icons/io";
import { Album } from "types";
import DefaultProfile from "./DefaultProfile";
import FormControl from "./FormControl";

interface AlbumFormProps {
  album: Partial<Album>;
  onSave?: VoidFunction;
}

const AlbumForm: React.FC<AlbumFormProps> = ({ album: p, onSave }) => {
  const [album, setAlbum] = useState(p);

  useEffect(() => {
    setAlbum(p);
  }, [p]);

  const isUpdate = !!album.id;

  const save = () => {
    window.electron.ipcRenderer.sendMessage(
      isUpdate ? "updateAlbum" : "createAlbum",
      album
    );
    onSave?.();
  };
  return (
    <>
      <Flex w="100%" height="300px" justify="center">
        <DefaultProfile />
      </Flex>
      <FormControl label="Name">
        <Input
          value={album.name}
          onChange={(e) =>
            setAlbum({
              ...album,
              name: e.target.value,
            })
          }
        />
      </FormControl>
      <FormControl label="Description">
        <TextArea
          value={album.description}
          onChange={(e) =>
            setAlbum({
              ...album,
              description: e.target.value,
            })
          }
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
            window.electron.ipcRenderer.sendMessage("deleteAlbum", album.id)
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

export default AlbumForm;
