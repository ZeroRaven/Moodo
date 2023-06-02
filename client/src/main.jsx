import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import { AuthProvider } from "./contexts/AuthProvider.jsx";
import { FireStoreProvider } from "./contexts/FirestoreProvider.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <FireStoreProvider>
        <AuthProvider>
          <App />
        </AuthProvider>
      </FireStoreProvider>
    </BrowserRouter>
  </React.StrictMode>
);
