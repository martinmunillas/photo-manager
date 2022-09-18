import { extendTheme, QuaantumProvider, theme } from "@quaantum/components";
import { MemoryRouter as Router, Routes, Route } from "react-router-dom";
import Albums from "./pages/Albums";
import Gallery from "./pages/Gallery";
import People from "./pages/People";

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
        color: "white",
        textDecoration: "none",
        bgColor: "secondary",
        _focus: {
          outline: "none",
        },
      },
      variants: {},
    },
    Heading: {
      base: {
        color: "primary",
        fontSize: "24px",
        fontWeight: "bold",
        textDecoration: "none",
      },
      variants: {},
    },
  },
});

export default function App() {
  return (
    <QuaantumProvider theme={photoTheme}>
      <Router>
        <Routes>
          <Route path="/" element={<Gallery />} />
          <Route path="/people" element={<People />} />
          <Route path="/albums" element={<Albums />} />
          <Route path="/album/:albumId" element={<Gallery />} />
        </Routes>
      </Router>
    </QuaantumProvider>
  );
}
