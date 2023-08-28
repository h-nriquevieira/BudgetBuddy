import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { AuthContextProvider } from "./context/AuthContext/AuthContext.tsx";
import "@radix-ui/themes/styles.css";
import { Theme } from "@radix-ui/themes";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthContextProvider>
      <Theme
        appearance="light"
        accentColor="jade"
        grayColor="sand"
        panelBackground="solid"
        radius="medium"
        scaling="110%"
      >
        <App />
      </Theme>
    </AuthContextProvider>
  </React.StrictMode>,
);
