import { Flex, Input, TextArea } from "@quaantum/components";
import React, { useEffect, useState } from "react";
import { IoIosSave, IoIosTrash } from "react-icons/io";
import { Album } from "types";
import DefaultProfile from "./DefaultProfile";
import FormControl from "./FormControl";
import IconButton from "./IconButton";

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
      <IconButton
        bgColor="primary"
        color="white"
        onClick={save}
        icon={IoIosSave}
      >
        Save
      </IconButton>
      {isUpdate && (
        <IconButton
          bgColor="danger"
          color="white"
          onClick={() =>
            window.electron.ipcRenderer.sendMessage("deleteAlbum", album.id)
          }
          icon={IoIosTrash}
        >
          Delete
        </IconButton>
      )}
    </>
  );
};

export default AlbumForm;
