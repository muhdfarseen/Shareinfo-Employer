import ReactDOM from "react-dom/client";
import "@mantine/core/styles.css";
import '@mantine/dates/styles.css';
import "./index.css";
import { MantineProvider } from "@mantine/core";
import App from "./App.jsx";


ReactDOM.createRoot(document.getElementById("root")).render(
    <MantineProvider defaultColorScheme="light" >
      <App/>
    </MantineProvider>
);