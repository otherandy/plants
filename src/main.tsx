import React from "react";
import ReactDOM from "react-dom/client";
import { initDb } from "./lib/db.ts";
import App from "./App.tsx";
import "@fontsource-variable/inter";
import "./index.css";

initDb().catch((err) => {
  if (err instanceof Error) console.error(err.message);
  else console.error("Something went wrong.");
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
