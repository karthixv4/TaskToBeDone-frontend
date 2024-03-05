import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { RecoilRoot } from "recoil";
import { BrowserRouter } from "react-router-dom";
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from "@vercel/speed-insights/react";
import { GoogleOAuthProvider } from '@react-oauth/google';
ReactDOM.createRoot(document.getElementById("root")).render(
  <GoogleOAuthProvider clientId="398071223768-j1cubciuki5t16uc2g80osrkeuotgd7j.apps.googleusercontent.com">
  <React.StrictMode>
     <BrowserRouter>
    <RecoilRoot>
    <Analytics />
        <App />
        <SpeedInsights />
    </RecoilRoot>
    </BrowserRouter>
  </React.StrictMode>
  </GoogleOAuthProvider>
);
