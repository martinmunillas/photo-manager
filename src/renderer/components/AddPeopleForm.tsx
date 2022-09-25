import { Box, Button, Heading } from "@quaantum/components";
import React, { useState } from "react";
import PeopleSelector from "./PeopleSelector";

interface AddPeopleFormProps {
  photos: string[];
  onAdd?: VoidFunction;
}

const AddPeopleForm: React.FC<AddPeopleFormProps> = ({ photos, onAdd }) => {
  const [people, setPeople] = useState<number[]>([]);

  const handleAdd = () => {
    window.electron.ipcRenderer.sendMessage("addPeopleToPhotos", {
      people,
      photos,
    });
    onAdd?.();
  };

  return (
    <Box>
      <Heading>Add people to {photos.length} photos</Heading>
      <PeopleSelector value={people} onChange={setPeople} />
      <Button onClick={handleAdd}>Add</Button>
    </Box>
  );
};

export default AddPeopleForm;
