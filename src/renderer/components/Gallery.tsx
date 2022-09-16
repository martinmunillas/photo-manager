import { Grid, Button, Img, GridProps } from "@quaantum/components";
import React from "react";
import { Photo } from "types";

interface GalleryProps extends Omit<GridProps, "onClick"> {
  photos: Photo[];
  onClick: (photo: Photo) => void;
  selected: Photo | null;
}

const Gallery: React.FC<GalleryProps> = ({
  photos,
  onClick,
  selected,
  ...props
}) => {
  return (
    <Grid
      gap="16px"
      gridTemplateColumns="repeat(auto-fit, minmax(200px, 1fr))"
      gridAutoRows="200px"
      placeItems="stretch"
      {...props}
    >
      {photos.map((photo) => (
        <Button
          onClick={() => {
            onClick(photo);
          }}
          key={photo.path}
          bg="none"
          p="8px"
          border="1px solid"
          borderColor={
            selected?.path === photo.path ? "white.light" : "transparent"
          }
          r="8px"
          _hover={{
            borderColor:
              selected?.path === photo.path ? "white.light" : "white.dark",
          }}
        >
          {photo.data ? (
            <Img
              width="100%"
              maxH="100%"
              objectFit="contain"
              alt="icon"
              src={photo.data}
            />
          ) : (
            "Image broken"
          )}
        </Button>
      ))}
    </Grid>
  );
};

export default Gallery;
