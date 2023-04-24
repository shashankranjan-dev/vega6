import CanvasEditor from "./components/CanvasEditor";
import SearchPage from "./components/Search";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="bg-gradient-to-b from-cyan-500 to-blue-500 min-h-screen">
      <Routes>
        <Route path="/" element={<SearchPage />} />
        <Route path="/add-captions" element={<CanvasEditor />} />
      </Routes>
    </div>
  );
}

export default App;
