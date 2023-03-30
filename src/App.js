import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Decrypt from "./Decrypt";
import Home from "./Home";
import Shayo from "./Shayo";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/decrypt" element={<Decrypt />} />

        <Route path="/shayo" element={<Shayo />} />
      </Routes>
    </BrowserRouter>
  );
}
