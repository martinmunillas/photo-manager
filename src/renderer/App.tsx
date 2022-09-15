import {
  Box,
  Button,
  extendTheme,
  Grid,
  Heading,
  QuaantumProvider,
  theme,
} from "@quaantum/components";
import { useState } from "react";
import { MemoryRouter as Router, Routes, Route } from "react-router-dom";
import { Photo } from "types";
import { usePhotos } from "./hooks/usePhotos";
import Sidebar from "./Sidebar";

const photoTheme = extendTheme(theme, {
  global: {
    body: {
      bgColor: "black.dark",
    },
    "*": {
      boxSizing: "border-box",
    },
    textarea: {
      boxSizing: "border-box",
    },
  },
  colors: {
    primary: {
      main: "#007bff",
      light: "#b3d7ff",
      dark: "#004085",
    },
    secondary: {
      main: "#6c757d",
      light: "#d6d8db",
      dark: "#343a40",
    },
    success: {
      main: "#28a745",
      light: "#c3e6cb",
      dark: "#155724",
    },
    info: {
      main: "#17a2b8",
      light: "#bee5eb",
      dark: "#0c5460",
    },
    warning: {
      main: "#ffc107",
      light: "#ffeeba",
      dark: "#1b1e21",
    },
    danger: {
      main: "#dc3545",
      light: "#f5c6cb",
      dark: "#721c24",
    },
    black: {
      main: "#111111",
      light: "#222222",
      dark: "#000000",
    },
    white: {
      main: "#eeeeee",
      light: "#ffffff",
      dark: "#cccccc",
    },
  },
  components: {
    Input: {
      base: {
        r: "8px",
        w: "100%",
        p: "8px",
        b: "none",
        _focus: {
          outline: "none",
        },
      },
      variants: {},
    },
    TextArea: {
      base: {
        r: "8px",
        w: "100%",
        p: "8px",
        b: "none",
        _focus: {
          outline: "none",
        },
      },
      variants: {},
    },
  },
});

const Hello = () => {
  const [selected, setSelected] = useState<Photo | null>(null);
  const photos = usePhotos();
  return (
    <Box>
      <Heading>Muni Photo Manager</Heading>
      <Grid
        gap="16px"
        gridTemplateColumns="repeat(auto-fit, minmax(200px, 1fr))"
      >
        {photos.map((photo) => (
          <Button
            onClick={() => {
              setSelected(photo);
            }}
            key={photo.path}
            bg="none"
            p="10px"
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
            <img width="200" alt="icon" src={photo.data} />
          </Button>
        ))}
      </Grid>
      {selected && (
        <Sidebar photo={selected} onClose={() => setSelected(null)} />
      )}
    </Box>
  );
};

export default function App() {
  return (
    <QuaantumProvider theme={photoTheme}>
      <Router>
        <Routes>
          <Route path="/" element={<Hello />} />
        </Routes>
      </Router>
    </QuaantumProvider>
  );
}
