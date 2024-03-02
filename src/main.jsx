import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { RecoilRoot } from "recoil";
import { BrowserRouter } from "react-router-dom";
import { Analytics } from '@vercel/analytics/react';
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
     <BrowserRouter>
    <RecoilRoot>
    <Analytics />
        <App />
  
    </RecoilRoot>
    </BrowserRouter>
  </React.StrictMode>
);
