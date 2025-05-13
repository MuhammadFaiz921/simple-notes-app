import ReactDOM from "react-dom/client";
import App from "./App";
import "./Styles.css";
import { ThemeProvider } from "next-themes";

ReactDOM.createRoot(document.getElementById("root")).render(
  <ThemeProvider attribute="data-theme" defaultTheme="light">
    <App />
  </ThemeProvider>
);
