import "./App.scss";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAppContext } from "./context/AppContext";
import Navbar from "./components/Navbar";

import LandingPage from "./pages/LandingPage";
import ProposalPage from "./pages/ProposalPage";
import AdminPage from "./pages/AdminPage";
import UserDashboard from "./pages/UserDashboard";
import ProposalForm from "./components/Form/ProposalSubmit";
import AuctionHistoryPage from "./pages/AuctionHistoryPage";
import VotePage from "./pages/VotePage";
import ActiveBid from "./pages/ActiveBid";
import NftHistoryPage from "./pages/NftHistoryPage";
import ActivityLeaderboard from "./pages/ActivityLeaderboardPage";

function App() {
    const { rewardsClaimStatus } = useAppContext();

    return (
        <div className="app">
            <BrowserRouter>
                <Navbar />

                <div className="pt-[80px] w-full flex flex-1 flex-col">
                    {rewardsClaimStatus && (
                        <div className="mb-4">
                            <div className="max-w-[800px] w-full bg-[#28a538] text-white text-center m-auto rounded-lg p-2">
                                Rewards claiming is Live now. Visit{" "}
                                <Link to="/leaderboard" className="underline">
                                    Leaderboard
                                </Link>{" "}
                                to see your rewards.
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
                        <Route path="/leaderboard" element={<ActivityLeaderboard />} />
                        <Route path="/nft-activities/:NftId" element={<NftHistoryPage />} />
                        <Route path="/" element={<LandingPage />} />
                    </Routes>
                    <ToastContainer />
                </div>
            </BrowserRouter>
        </div>
    );
}

export default App;
