import "./App.scss";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import LandingPage from "./pages/LandingPage";
import ProposalPage from "./pages/ProposalPage";
import AdminPage from "./pages/AdminPage";
import UserDashboard from "./pages/UserDashboard";
import ProposalForm from "./components/Form/ProposalSubmit";
import AuctionHistoryPage from "./pages/AuctionHistoryPage";
import VotePage from "./pages/VotePage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
    return (
        <div className="app">
            <BrowserRouter>
                <Navbar />

                <div className="pt-[80px] w-full flex flex-1">
                    <Routes>
                        <Route path="/proposals" element={<ProposalPage />} />
                        <Route path="/admin" element={<AdminPage />} />
                        <Route path="/user-dashboard" element={<UserDashboard />} />
                        <Route path="/proposal-submit" element={<ProposalForm />} />
                        <Route path="/history" element={<AuctionHistoryPage />} />
                        <Route path="/vote/:proposalId" element={<VotePage />} />
                        <Route path="/" element={<LandingPage />} />
                    </Routes>
                    <ToastContainer />
                </div>
            </BrowserRouter>
        </div>
    );
}

export default App;
