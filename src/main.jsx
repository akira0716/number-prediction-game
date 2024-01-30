import React from "react";
import { createRoot } from "react-dom/client";

import App from "./App";

import "./css/style.css";

const rootElem = document.getElementById("root");
const root = createRoot(rootElem);
root.render(<App />);
