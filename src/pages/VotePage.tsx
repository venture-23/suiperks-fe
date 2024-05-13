import { useWallet } from "@suiet/wallet-kit";
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

const VotePage = () => {
    const { proposalId } = useParams<{ proposalId?: string }>() ?? { proposalId: "" };
    const [proposal, setProposal] = useState<Proposal | null>(null);
    const [votes, setVotes] = useState<Votes>({ for: 0, against: 0, abstain: 0 });
    const wallet = useWallet();

    useEffect(() => {
        const id = proposalId || "";
        const proposalDetails = getStaticProposalData(parseInt(id));
        setProposal(proposalDetails);
        if (proposalDetails) {
            initializeVotes(proposalDetails);
        }
    }, [proposalId]);

    const initializeVotes = (proposal: Proposal) => {
        setVotes({ for: 10, against: 5, abstain: 3 });
    };

    const getStaticProposalData = (id: number): Proposal => {
        const proposals: { [key: number]: Proposal } = {
            2: {
                id: 2,
                name: "Proposal Title 2",
                status: "Active",
                threshold: "50%",
                endTime: "2024-05-15",
                snapshot: "2024-05-08",
            },
            3: {
                id: 3,
                name: "Proposal Title 3",
                status: "Queued",
                threshold: "50%",
                endTime: "2024-05-15",
                snapshot: "2024-05-08",
            },
            5: {
                id: 5,
                name: "Proposal Title 5",
                status: "Passed",
                threshold: "50%",
                endTime: "2024-05-15",
                snapshot: "2024-05-08",
            },
            6: {
                id: 6,
                name: "Proposal Title 6",
                status: "Failed",
                threshold: "50%",
                endTime: "2024-05-15",
                snapshot: "2024-05-08",
            },
        };
        return proposals[id];
    };

    if (!proposal) {
        return null;
    }

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
        <>
            <div className="md:mx-40 my-10 mx-4">
                <div className="flex items-center gap-6 mb-3">
                    <div className="name text-gray-500 md:text-xl text-lg">Proposal {proposal.id}</div>
                    <div
                        className="proposal-status p-3 m-2 text-white font-bold md:text-base text-xs"
                        style={{ backgroundColor: getStatusColor(proposal.status), borderRadius: "4px" }}
                    >
                        {proposal.status}
                    </div>
                </div>

                <div className="flex items-center justify-between border-b border-gray-500 mb-4 pb-4">
                    <div className="name md:text-4xl text-2xl">{proposal.name}</div>

                    {proposal.status === "Active" && (
                        <div className="my-4 flex justify-between py-4">
                            <div>
                                {wallet.connected ? (
                                    <Link
                                        to="/proposal-submit"
                                        className="proposal-button px-4 py-4 bg-blue-700 hover:bg-blue-500 text-white rounded-md"
                                    >
                                        Vote
                                    </Link>
                                ) : (
                                    <div className="flex items-center gap-10">
                                        <p>Connect wallet to vote</p>
                                        <button
                                            disabled
                                            className="proposal-button px-4 py-4 bg-gray-300 text-gray-500 rounded-md cursor-not-allowed"
                                        >
                                            Vote
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </div>

                <div className="flex justify-around">
                    <p className="text-green-700 md:text-2xl text-xl name">
                        For: <span className="md:text-3xl text-xl">{votes.for}</span>
                    </p>
                    <p className="text-red-700 md:text-2xl text-lg name">
                        Against: <span className="md:text-3xl text-xl">{votes.against}</span>
                    </p>
                    <p className="text-gray-800 md:text-2xl text-lg name">
                        Abstain: <span className="md:text-3xl text-xl">{votes.abstain}</span>
                    </p>
                </div>

                <div className="flex md:flex-row flex-col justify-around gap-2 mt-8">
                    <div className="bg-gray-200 rounded-lg px-4 py-6 flex items-center justify-around gap-10">
                        <p className="text-gray-700 name  text-xl font-semibold">Threshold</p>
                        <div className="flex flex-col justify-end">
                            <p className="text-sm">Current Threshold</p>
                            <p className="text-lg font-bold">{proposal.threshold}</p>
                        </div>
                    </div>
                    <div className="bg-gray-200 rounded-lg p-4 flex items-center justify-around gap-10 ">
                        <p className="text-gray-700  name  text-xl font-semibold">
                            <p> {proposal.status === "Active" ? "Ends On" : "Ended"}</p>
                        </p>
                        <div className="flex flex-col justify-end">
                            <p className="text-lg font-bold">{proposal.endTime}</p>
                        </div>
                    </div>
                    <div className="bg-gray-200 rounded-lg p-4 flex items-center justify-around gap-10 ">
                        <p className="text-gray-700 name  text-xl font-semibold">Snapshot</p>
                        <div className="flex flex-col justify-end">
                            <p className="text-sm">Taken at block</p>
                            <p className="text-lg font-bold">{proposal.snapshot}</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default VotePage;

type Proposal = {
    id: number;
    name: string;
    status: string;
    threshold: string;
    endTime: string;
    snapshot: string;
};

type Votes = {
    for: number;
    against: number;
    abstain: number;
};
