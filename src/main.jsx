import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import ExpenseProvider from "./context/ExpenseProvider.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ExpenseProvider>
      <App />
    </ExpenseProvider>
  </StrictMode>
);
