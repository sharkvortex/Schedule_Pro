import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import "./main.css";
import App from "./App";
import Header from "./components/Header";
createRoot(document.getElementById("root")!).render(
  <HelmetProvider>
    <BrowserRouter>
      <Header />
      <App />
    </BrowserRouter>
  </HelmetProvider>
);
