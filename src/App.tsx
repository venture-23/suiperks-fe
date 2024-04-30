import "./App.scss";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import LandingPage from "./components/pages/LandingPage";
import ProposalPage from "./components/pages/ProposalPage";

function App() {
    return (
        <div className="app">
            <BrowserRouter>
                <Navbar />
                <Routes>
                    <Route path="/" element={<LandingPage />} />
                    <Route path="/proposals" element={<ProposalPage />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
