import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { initializeDemoData } from "./data/demoData";

// Initialize demo data before rendering
initializeDemoData();

createRoot(document.getElementById("root")!).render(<App />);
