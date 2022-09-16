import { Box } from "@quaantum/components";
import React from "react";

interface DefaultProfileProps {
  size?: string;
}

const DefaultProfile: React.FC<DefaultProfileProps> = ({ size }) => {
  return (
    <Box
      customCss={`
        aspect-ratio: 1;
      `}
      h={size || "100%"}
      bgColor="secondary"
      r="100%"
    />
  );
};

export default DefaultProfile;
