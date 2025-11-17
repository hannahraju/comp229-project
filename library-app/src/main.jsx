import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import IngredientsList from "./App.jsx";
createRoot(document.getElementById("root")).render(
<StrictMode>
<IngredientsList />
</StrictMode>
);