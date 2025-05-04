import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "./context/AuthContext";
import "./main.css";
import App from "./App";
import Header from "./components/Header";
createRoot(document.getElementById("root")!).render(
  <HelmetProvider>
    <BrowserRouter>
    <AuthProvider>
      <Header />
      <Toaster position="top-right" reverseOrder={false} />
      <App />
      </AuthProvider>
    </BrowserRouter>
  </HelmetProvider>
);
