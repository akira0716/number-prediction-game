import React from "react";
import { Routes, Route } from "react-router-dom";

import Home from "./routes/Home";
import PlayDisp01 from "./routes/PlayDisp01";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/game" element={<PlayDisp01 />} />
      </Routes>
    </>
  );
};

export default App;
