import "./App.scss";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import LandingPage from "./pages/LandingPage";
import ProposalPage from "./pages/ProposalPage";
import CreateAuctionPage from "./pages/CreateAuction";
import UserDashboard from "./pages/UserDashboard";
import ProposalForm from "./components/Form/ProposalSubmit";
import AuctionHistoryPage from "./pages/AuctionHistoryPage";
import VotePage from "./pages/VotePage";

function App() {
    return (
        <div className="app">
            <BrowserRouter>
                <Navbar />
                <Routes>
                    <Route path="/proposals" element={<ProposalPage />} />
                    <Route path="/admin" element={<CreateAuctionPage />} />
                    <Route path="/user-dashboard" element={<UserDashboard />} />
                    <Route path="/proposal-submit" element={<ProposalForm />} />
                    <Route path="/history" element={<AuctionHistoryPage />} />
                    <Route path="/" element={<LandingPage />} />
                    <Route path="/vote/:proposalId" element={<VotePage />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
