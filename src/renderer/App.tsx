import {
  Box,
  extendTheme,
  Heading,
  Input,
  QuaantumProvider,
  theme,
} from "@quaantum/components";
import { useState } from "react";
import { MemoryRouter as Router, Routes, Route } from "react-router-dom";
import { useDebounce } from "./hooks/useDebounce";
import { usePhotos } from "./hooks/usePhotos";
import Sidebar from "./components/Sidebar";
import Gallery from "./components/Gallery";
import { Photo } from "types";

const photoTheme = extendTheme(theme, {
  global: {
    body: {
      bgColor: "black.dark",
      width: "100vw",
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
    Button: {
      base: {
        cursor: "pointer",
        r: "8px",
        p: "8px",
        b: "none",
        bgColor: "secondary",
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
  const [search, setSearch] = useState("");
  const query = useDebounce(search, 100);
  const photos = usePhotos(query);
  return (
    <>
      <Sidebar photo={selected} onClose={() => setSelected(null)} />
      <Box
        padding="32px"
        width={selected ? "60vw" : "100vw"}
        transition="width 200ms ease"
      >
        <Heading>Muni Photo Manager</Heading>
        <Input
          my="16px"
          mx="9px"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Gallery photos={photos} selected={selected} onClick={setSelected} />
      </Box>
    </>
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
