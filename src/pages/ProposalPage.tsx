import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../assets/stylings/ProposalPage.scss";
import { fetchAllProposals, Proposal, Status } from "../services/proposalServices";
import { useWallet } from "@suiet/wallet-kit";
import { useAppContext } from "../context/AppContext";

const ProposalPage = () => {
    const wallet = useWallet();
    const { userOwnedNFTs } = useAppContext();
    const [proposals, setProposals] = useState<Proposal[] | null>(null);

    const getStatusColor = (status: Status) => {
        switch (status) {
            case Status.ACTIVE:
                return "#43b369";
            case Status.FAILED:
                return "#e40536";
            case Status.QUEUE:
                return "#FFA500";
            case Status.WAITING:
                return "#6c757d";
            case Status.EXECUTED:
                return "#0d6efd";
            case Status.INITIAL:
                return "#9370DB";
            default:
                return "#d36ba6";
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            const proposalsData = await fetchAllProposals();
            if (proposalsData) {
                setProposals(proposalsData);
            }
        };
        fetchData();
    }, []);

    return (
        <div className="proposals-page w-full max-w-[1200px] mx-auto p-4 py-10">
            <div className="name text-gray-500 md:text-2xl text-lg">Governance</div>
            <div className="name md:text-6xl text-3xl">EthenaDAO</div>
            <div className="my-4 flex md:justify-end py-4 ">
                <div>
                    {wallet.connected ? (
                        userOwnedNFTs.length === 0 ? (
                            <div className="flex items-center gap-10">
                                <p>You must own an NFT to make a proposal</p>
                                <button
                                    disabled
                                    className="proposal-button px-4 py-4 bg-gray-300 text-gray-500 rounded-md cursor-not-allowed"
                                >
                                    Submit Proposal
                                </button>
                            </div>
                        ) : (
                            <Link
                                to="/proposal-submit"
                                className="proposal-button px-4 py-4 bg-blue-700 hover:bg-blue-500 text-white rounded-md"
                            >
                                Submit Proposal
                            </Link>
                        )
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

            {proposals === null ? (
                <div className="loading-state">
                    <h1 className="name text-xl font-bold">Loading proposals...</h1>
                </div>
            ) : (
                <>
                    {proposals.length === 0 ? (
                        <div className="mt-4 pt-4 text-lg text-center border-t border-gray-500">
                            There are no proposals to display.
                        </div>
                    ) : (
                        <ul className="my-10 w-full max-w-[800px] mx-auto">
                            {proposals.map((proposal) => (
                                <li key={proposal._id} className="single-list-container mb-3 px-10 py-2">
                                    <Link
                                        to={`/vote/${proposal._id}`}
                                        className="proposal-content flex justify-between items-center md:text-2xl text-lg"
                                    >
                                        <div className="flex gap-4">
                                            <span className="font-bold">{proposal.title.replace(/^#\s*/, "")}</span>
                                        </div>
                                        <div
                                            className="proposal-status p-3 m-2 text-white font-bold md:text-base text-xs"
                                            style={{
                                                backgroundColor: getStatusColor(proposal.status),
                                                borderRadius: "4px",
                                            }}
                                        >
                                            {proposal.status}
                                        </div>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    )}
                </>
            )}
        </div>
    );
};

export default ProposalPage;
