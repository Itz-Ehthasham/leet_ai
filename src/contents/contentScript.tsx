import { createRoot } from "react-dom/client";
import LogoButton from "../components/logoButton";
import "../index.css";

// Inject Tailwind CSS
if (!document.getElementById("tailwind-cdn")) {
  const script = document.createElement("script");
  script.id = "tailwind-cdn";
  script.src = "https://cdn.tailwindcss.com";
  document.head.appendChild(script);
}

if (!document.getElementById("leety-ai-root")) {
  const container = document.createElement("div");
  container.id = "leety-ai-root";
  document.body.appendChild(container);

  const root = createRoot(container);
  root.render(<LogoButton />);
}