import { Box, Button, Heading } from "@quaantum/components";
import React, { useState } from "react";
import AlbumSelector from "./AlbumSelector";

interface AddToAlbumFormProps {
  photos: string[];
  onAdd?: VoidFunction;
}

const AddToAlbumForm: React.FC<AddToAlbumFormProps> = ({ photos, onAdd }) => {
  const [album, setAlbum] = useState<number>();

  const handleAdd = () => {
    window.electron.ipcRenderer.sendMessage("addPhotosToAlbum", {
      album,
      photos,
    });
    onAdd?.();
  };

  return (
    <Box>
      <Heading>Add {photos.length} to album</Heading>
      <AlbumSelector album={album} onChange={setAlbum} />
      <Button onClick={handleAdd}>Add</Button>
    </Box>
  );
};

export default AddToAlbumForm;
