import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { AppProvider } from "./contexts/AppContext";
import { AuthProvider } from "./contexts/AuthContext";
import App from "./App";
import ScrollToTop from "./components/ScrollToTop";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <AppProvider>
        <AuthProvider>
          <ScrollToTop />
          <App />
        </AuthProvider>
      </AppProvider>
    </BrowserRouter>
  </React.StrictMode>
);
