import { Flex, Img, Input, TextArea } from "@quaantum/components";
import React, { useEffect, useState } from "react";
import { IoIosSave } from "react-icons/io";
import { Photo } from "types";
import DateField from "./DateField";
import FormControl from "./FormControl";
import IconButton from "./IconButton";
import TagsManager from "./TagsManager";

interface PhotoFormProps {
  photo: Photo;
  onSave?: VoidFunction;
}

const PhotoForm: React.FC<PhotoFormProps> = ({ photo: p, onSave }) => {
  const [photo, setPhoto] = useState(p);

  useEffect(() => {
    setPhoto(p);
  }, [p]);

  const update = () => {
    window.electron.ipcRenderer.sendMessage("updatePhoto", photo);
    onSave?.();
  };
  return (
    <>
      <Flex w="100%" height="300px" justify="center">
        {photo.data && (
          <Img
            src={photo.data}
            alt=""
            objectFit="contain"
            d="block"
            maxW="100%"
            maxH="100%"
          />
        )}
      </Flex>
      <FormControl label="Path">
        <Input value={photo.path} readOnly />
      </FormControl>
      <FormControl label="Date (dd/mm/yyyy)">
        <DateField
          value={photo.date}
          onChange={(d) => setPhoto({ ...photo, date: d })}
        />
      </FormControl>
      <FormControl label="Description">
        <TextArea
          value={photo.description}
          onChange={(e) => setPhoto({ ...photo, description: e.target.value })}
        />
      </FormControl>
      <FormControl label="Tags">
        <TagsManager
          tags={photo.tags}
          onChange={(t) => setPhoto({ ...photo, tags: t })}
        />
      </FormControl>
      <IconButton
        bgColor="primary"
        color="white"
        onClick={update}
        icon={IoIosSave}
      >
        Save
      </IconButton>
    </>
  );
};

export default PhotoForm;
