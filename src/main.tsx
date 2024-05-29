import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { WalletProvider } from "@suiet/wallet-kit";
import "@suiet/wallet-kit/style.css";
import "./assets/stylings/SuietWalletCustom.scss";
import { AppProvider } from "./context/AppContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <WalletProvider>
            <AppProvider>
                <App />
            </AppProvider>
        </WalletProvider>
    </React.StrictMode>
);
