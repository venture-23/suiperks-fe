import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../assets/stylings/ProposalPage.scss";
import { fetchAllProposals, Proposal, Status } from "../services/proposalServices";
import { useWallet } from "@suiet/wallet-kit";
import { useAppContext } from "../context/AppContext";

const SUI_EXPLORER_URL = "https://suiscan.xyz/testnet";

const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    return `${hours}:${minutes} ${day}-${month}-${year}`;
};

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
                const proposalDataWithId = proposalsData.map((proposal, index) => {
                    return { ...proposal, index_id: index + 1 };
                });
                const proposalDataDesc = proposalDataWithId.reverse();
                setProposals(proposalDataDesc);
            }
        };
        fetchData();
    }, []);

    return (
        <div className="proposals-page w-full max-w-[1200px] my-8 mx-auto p-4">
            <div className="name text-gray-500 md:text-2xl text-lg">Governance</div>
            <div className="name text-[#1c0971] md:text-6xl text-3xl">Proposals</div>
            <div className="my-4 flex md:justify-end py-4">
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
                                className="proposal-button px-4 py-4 bg-[#1c0971] hover:bg-blue-500 text-white rounded-md"
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
                    <h1 className="text-lg font-semibold text-[#1c0971]">Loading proposals...</h1>
                </div>
            ) : (
                <>
                    {proposals.length === 0 ? (
                        <div className="mt-4 pt-4 text-lg font-semibold border-t border-gray-500">
                            There are no proposals to display.
                        </div>
                    ) : (
                        <ul className="my-10 w-full max-w-[800px] mx-auto">
                            {proposals.map((proposal) => (
                                <li key={proposal._id} className="single-list-container box-shadow mb-5 px-10 py-4">
                                    <Link to={`/vote/${proposal._id}`} className="flex gap-8">
                                        <div className="flex mt-[18px] text-xl font-semibold">{proposal.index_id}.</div>
                                        <div className="w-full flex flex-col gap-1">
                                            <div className="flex items-center justify-between">
                                                <span className="font-semibold md:text-2xl text-lg">
                                                    {proposal.title.replace(/^#\s*/, "")}
                                                </span>
                                                <div
                                                    className="proposal-status p-3 m-2 text-white font-bold md:text-base text-xs"
                                                    style={{
                                                        backgroundColor: getStatusColor(proposal.status),
                                                        borderRadius: "4px",
                                                    }}
                                                >
                                                    {proposal.status}
                                                </div>
                                            </div>
                                            <div className="flex md:flex-row flex-col md:items-center items-start justify-between text-sm md:text-base">
                                                <span>
                                                    Proposed By:{" "}
                                                    <Link
                                                        to={`${SUI_EXPLORER_URL}/account/${proposal.proposer}`}
                                                        target="_blank"
                                                        className="underline"
                                                        onClick={(e) => e.stopPropagation()}
                                                    >
                                                        {proposal.proposer.slice(0, 6)}...{proposal.proposer.slice(-6)}
                                                    </Link>
                                                </span>
                                                {proposal.forVotes + proposal.againstVotes + proposal.refrainVotes >
                                                0 ? (
                                                    <span className="name text-lg font-semibold">
                                                        {proposal.forVotes +
                                                            proposal.againstVotes +
                                                            proposal.refrainVotes}
                                                        &nbsp; votes
                                                    </span>
                                                ) : (
                                                    ""
                                                )}
                                            </div>
                                            <div className="flex md:flex-row flex-col md:items-center items-end justify-between text-sm md:text-base">
                                                <span>Start Time: {formatDate(proposal.startTime)}</span>
                                                <span>End Time: {formatDate(proposal.endTime)}</span>
                                            </div>

                                            <span className="font-semibold md:text-lg text-base">
                                                Seeking Amount: {proposal.seekAmount * 10 ** -9}
                                            </span>
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
