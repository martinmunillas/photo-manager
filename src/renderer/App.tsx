import { MemoryRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import { usePhotos } from "./hooks/usePhotos";

const Hello = () => {
  const photos = usePhotos();
  return (
    <div>
      <h1>Muni Photo Manager</h1>
      <div className="Hello">
        {photos.map((photo) => (
          <img width="200" alt="icon" key={photo.path} src={photo.data} />
        ))}
      </div>
    </div>
  );
};

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Hello />} />
      </Routes>
    </Router>
  );
}
