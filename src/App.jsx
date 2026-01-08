import { Routes, Route } from "react-router-dom";
import { Home, Features, Pricing } from "./pages";
import "./App.css";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/features" element={<Features />} />
      <Route path="/pricing" element={<Pricing />} />

    </Routes>
  );
}

export default App;

