import { useWallet } from "@suiet/wallet-kit";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import { fetchProposalDetails, Proposal, Status } from "../services/proposalServices";

const VotePage = () => {
    const { proposalId } = useParams<{ proposalId?: string }>() ?? { proposalId: "" };
    const [proposal, setProposal] = useState<Proposal | null>(null);
    const [votes, setVotes] = useState<Votes>({ for: 0, against: 0, abstain: 0 });
    const wallet = useWallet();

    const initializeVotes = (proposal: Proposal) => {
        setVotes({ for: proposal.forVotes, against: proposal.againstVotes, abstain: 0 });
    };

    if (!proposal) {
        return <div>Loading...</div>;
    }

    const getStatusColor = (status: Status) => {
        switch (status) {
            case Status.ACTIVE:
                return "#43b369";
            case Status.EXECUTED:
                return "#0d6efd";
            case Status.QUEUE:
                return "#8c8d92";
            case Status.FAILED:
                return "#e40536";
            case Status.WAITING:
                return "#888888";
            default:
                return "white";
        }
    };

    const handleVote = () => {
        console.log("vote");
    };

    useEffect(() => {
        const fetchProposal = async () => {
            if (proposalId) {
                const proposalDetails = await fetchProposalDetails(proposalId);
                setProposal(proposalDetails);
                if (proposalDetails) {
                    initializeVotes(proposalDetails);
                }
            }
        };
        fetchProposal();
    }, [proposalId]);

    return (
        <>
            <div className="proposal-page w-full md:mx-40 my-10 mx-4">
                {/* <div className="flex items-center gap-6 mb-3">
                    <div className="name text-gray-500 md:text-xl text-lg">Proposal {proposal._id}</div>
                    <div
                        className="proposal-status p-3 m-2 text-white font-bold md:text-base text-xs"
                        style={{ backgroundColor: getStatusColor(proposal.status), borderRadius: "4px" }}
                    >
                        {proposal.status}
                    </div>
                </div> */}

                <div className="flex items-center justify-between border-b border-gray-500 mb-4 pb-4">
                    <div className="name md:text-4xl text-2xl">{proposal.title.replace(/^#\s*/, "")}</div>
                    <div
                        className="proposal-status p-3 m-2 text-white font-bold md:text-base text-xs"
                        style={{ backgroundColor: getStatusColor(proposal.status), borderRadius: "4px" }}
                    >
                        {proposal.status}
                    </div>

                    {proposal.status === Status.ACTIVE && (
                        <div className="my-4 flex justify-between py-4">
                            <div>
                                {wallet.connected ? (
                                    <button
                                        onClick={handleVote}
                                        className="proposal-button px-4 py-4 bg-blue-700 hover:bg-blue-500 text-white rounded-md"
                                    >
                                        Vote
                                    </button>
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

                <div className="flex md:flex-row flex-col gap-10">
                    <div className="description md:w-3/4">
                        <div className="text-gray-700 font-semibold md:text-4xl text-2xl name py-4">Description</div>
                        <ReactMarkdown
                            components={{
                                h1: ({ children }) => <h1 className="name md:text-2xl text-lg">{children}</h1>,
                                h2: ({ children }) => (
                                    <h2 className="name md:text-xl text-base mt-4 mb-2">{children}</h2>
                                ),
                            }}
                        >
                            {proposal.details}
                        </ReactMarkdown>
                    </div>
                    <div className="votes md:w-1/4 flex flex-col md:border-t-0 border-t border-gray-500">
                        <div className="flex flex-col justify-around">
                            <div className="text-gray-700 font-semibold lg:text-4xl text-2xl name py-4">Votes</div>

                            <p className="text-green-700 lg:text-2xl text-xl font-semibold">
                                In favor of : <span className="lg:text-3xl text-xl font-normal name">{votes.for}</span>
                            </p>
                            <p className="text-red-700 lg:text-2xl text-lg font-semibold">
                                Opposed to :{" "}
                                <span className="lg:text-3xl text-xl font-normal name">{votes.against}</span>
                            </p>
                            <p className="text-gray-800 lg:text-2xl text-lg font-semibold">
                                Refrain : <span className="lg:text-3xl text-xl name font-normal">{votes.abstain}</span>
                            </p>
                        </div>
                        <div className="flex flex-col justify-around gap-2 mt-8">
                            <div className="bg-gray-200 rounded-lg px-4 py-6 flex items-center justify-around gap-2">
                                <p className="text-gray-700 name  text-lg font-semibold">Threshold</p>
                                <div className="flex flex-col justify-end">
                                    <p className="text-xs">Current Threshold</p>
                                    <p className="text-base font-bold">{proposal.votingQuorumRate}%</p>
                                </div>
                            </div>
                            <div className="bg-gray-200 rounded-lg p-4 flex items-center justify-around gap-2">
                                <p className="text-gray-700  name  text-lg font-semibold">
                                    <p> {proposal.status === Status.ACTIVE ? "Ends On" : "Ended"}</p>
                                </p>
                                <div className="flex flex-col justify-end">
                                    <p className="text-xs font-bold">{proposal.endTime}</p>
                                </div>
                            </div>
                            {/* <div className="bg-gray-200 rounded-lg p-4 flex items-center justify-around gap-2">
                                <p className="text-gray-700 name  text-lg font-semibold">Snapshot</p>
                                <div className="flex flex-col justify-end">
                                    <p className="text-xs">Taken at block</p>
                                    <p className="text-base font-bold">{proposal.snapshot}</p>
                                </div>
                            </div> */}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default VotePage;

type Votes = {
    for: number;
    against: number;
    abstain: number;
};
