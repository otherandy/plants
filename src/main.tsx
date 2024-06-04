import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { initDb } from "./lib/db.ts";

try {
  await initDb();
} catch (err) {
  if (err instanceof Error) console.error(err.message);
  else console.error("Something went wrong.");
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
