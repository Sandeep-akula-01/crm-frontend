import { Routes, Route } from "react-router-dom";
import { Home, Features, Pricing, Contact, SignUp, Otp, Login } from "./pages";
import "./App.css";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/features" element={<Features />} />
      <Route path="/pricing" element={<Pricing />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/signUp" element={<SignUp />} />
      <Route path="/otp" element={<Otp />} />
      <Route path="/login" element={<Login />} />

    </Routes>
  );
}

export default App;

