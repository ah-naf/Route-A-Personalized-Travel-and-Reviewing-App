import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import CreateRoute from "./Pages/CreateRoute";
import HomePage from "./Pages/HomePage";

function App() {
  const [count, setCount] = useState(0);

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/create" element={<CreateRoute />} />
    </Routes>
  );
}

export default App;
