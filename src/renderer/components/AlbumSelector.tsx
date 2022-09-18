import { Input } from "@quaantum/components";
import React from "react";
import { useAlbums } from "renderer/hooks/useAlbums";

interface AlbumSelectorProps {
  album?: number;
  onChange: (album: number) => void;
}

const AlbumSelector: React.FC<AlbumSelectorProps> = ({ album, onChange }) => {
  const { albums } = useAlbums();
  return (
    <Input
      as="select"
      value={album}
      onChange={(e) => onChange(Number(e.target.value))}
    >
      {albums.map((album) => (
        <option value={album.id}>{album.name}</option>
      ))}
    </Input>
  );
};

export default AlbumSelector;
