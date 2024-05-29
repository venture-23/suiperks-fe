import "./App.scss";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
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
import ActiveBid from "./pages/ActiveBid";

function App() {
    return (
        <div className="app">
            <BrowserRouter>
                <Navbar />

                <div className="pt-[80px] w-full flex flex-1 flex-col">
                    {false && (
                        <div className="mb-4">
                            <div className="max-w-[800px] w-full bg-[#28a538] text-white text-center m-auto rounded-lg p-2">
                                Rewards claiming is Live now. Visit{" "}
                                <Link to="/dashboard" className="underline">
                                    Dashboard
                                </Link>{" "}
                                to claim your eligible rewards.
                            </div>
                        </div>
                    )}

                    <Routes>
                        <Route path="/proposals" element={<ProposalPage />} />
                        <Route path="/auction" element={<ActiveBid />} />
                        <Route path="/admin" element={<AdminPage />} />
                        <Route path="/dashboard" element={<UserDashboard />} />
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
