import { createRoot } from "react-dom/client";
import LogoButton from "../components/logoButton";
import "../index.css";

if (!document.getElementById("leety-ai-root")) {
  const container = document.createElement("div");
  container.id = "leety-ai-root";
  document.body.appendChild(container);

  const root = createRoot(container);
  root.render(<LogoButton />);
}