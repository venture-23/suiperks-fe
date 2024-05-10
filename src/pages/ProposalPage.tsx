import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../assets/stylings/ProposalPage.scss";

import BarImg from "../assets/images/bars.png";
import { useWallet } from "@suiet/wallet-kit";

type Proposal = {
    id: number;
    name: string;
    status: string;
};

const ProposalPage = () => {
    const initialProposals: Proposal[] = [
        { id: 2, name: "Proposal Title 2", status: "Active" },
        { id: 3, name: "Proposal Title 3", status: "Queued" },
        { id: 5, name: "Proposal Title 5", status: "Passed" },
        { id: 6, name: "Proposal Title 6", status: "Failed" },
    ];

    const wallet = useWallet();

    const [proposals, setProposals] = useState([] as Proposal[]);
    const [currentTreasury, setCurrentTreasury] = useState("0.00");
    const [treasuryAmount, setTreasuryAmount] = useState("0");

    useEffect(() => {
        setProposals(initialProposals);
    }, []);

    const getStatusColor = (status: string) => {
        switch (status) {
            case "Active":
                return "#43b369";
            case "Passed":
                return "#0d6efd";
            case "Queued":
                return "#8c8d92";
            case "Failed":
                return "#e40536";
            default:
                return "white";
        }
    };

    return (
        <div className="md:mx-40 my-10 mx-4">
            <div className="name text-gray-500 text-2xl">Governance</div>
            <div className="name text-6xl">EthenaDAO</div>
            <div className="my-4 flex justify-between py-4">
                <div>Submit your proposal</div>
                <div>
                    {wallet.connected ? (
                        <Link
                            to="/proposal-submit"
                            className="proposal-button px-4 py-4 bg-blue-700 hover:bg-blue-500 text-white rounded-md"
                        >
                            Submit Proposal
                        </Link>
                    ) : (
                        <div className="flex items-center gap-10">
                            <p>Connect wallet to make a proposal</p>
                            <button
                                disabled
                                className="proposal-button px-4 py-4 bg-gray-300 text-gray-500 rounded-md cursor-not-allowed"
                            >
                                Submit Proposal
                            </button>
                        </div>
                    )}
                </div>
            </div>

            <div className="treasury flex flex-col lg:flex-row border border-b border-gray-700 rounded-2xl p-6 gap-10">
                <div className="treasure-left">
                    <div className="name text-gray-500 text-2xl">Treasury</div>
                    <div className="flex gap-10">
                        <h3 className="name md:text-3xl text-2xl font-bold flex items-center gap-2">
                            <img src={BarImg} className="w-5 h-5" />

                            {currentTreasury}
                        </h3>

                        <h3 className=" name md:text-3xl text-2xl font-bold flex items-center gap-2 lg:pl-4 lg:border-l lg:border-gray-700">
                            ${treasuryAmount}
                        </h3>
                    </div>
                </div>

                <div className="treasure-right lg:pl-4 lg:ml-96 lg:border-l lg:border-gray-700">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore
                </div>
            </div>
            <ul className="md:mx-40 my-10 mx-4">
                {proposals.map((proposal) => (
                    <li key={proposal.id} className="single-list-container mb-3 px-6 py-2">
                        <div className="proposal-content flex justify-between items-center md:text-2xl text-lg">
                            <div className="flex gap-4">
                                <span className="name font-bold text-gray-600">{proposal.id}</span>
                                <span className="font-bold">{proposal.name}</span>
                            </div>
                            <div
                                className="proposal-status p-3 m-2 text-white font-bold md:text-base text-xs"
                                style={{ backgroundColor: getStatusColor(proposal.status), borderRadius: "4px" }}
                            >
                                {proposal.status}
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ProposalPage;
