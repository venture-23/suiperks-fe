import { useWallet } from "@suiet/wallet-kit";
import { useState, useEffect, useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import {
    castVoteTxb,
    changeVoteTxb,
    fetchProposalDetails,
    Proposal,
    revokeVoteTxb,
    Status,
} from "../services/proposalServices";
import { useAppContext } from "../context/AppContext";
import { toast } from "react-toastify";

// Todo: Update Testnet value
const SUI_EXPLORER_URL = "https://suiscan.xyz/testnet";

const VotePage = () => {
    const { proposalId } = useParams<{ proposalId?: string }>() ?? { proposalId: "" };
    const [proposal, setProposal] = useState<Proposal>({
        _id: "",
        title: "",
        details: "",
        forVotes: 0,
        againstVotes: 0,
        refrainVotes: 0,
        eta: 0,
        actionDelay: 0,
        hash: "",
        seekAmount: 0,
        executable: false,
        status: Status.WAITING,
        forVoterList: [],
        againstVoterList: [],
        createdAt: "",
        __v: 0,
        endTime: "",
        objectId: "",
        proposer: "",
        quorumVotes: 0,
        startTime: "",
        votingQuorumRate: 0,
        executedHash: "",
    });
    const [votes, setVotes] = useState<Votes>({ for: 0, against: 0, abstain: 0 });
    const wallet = useWallet();
    const { activeNFT } = useAppContext();
    const votedNFTList = useMemo(() => {
        const forVoters = proposal.forVoterList.map((item) => item.nftId);
        const againstVoters = proposal.againstVoterList.map((item) => item.nftId);
        return [...forVoters, ...againstVoters];
    }, [proposal.forVoterList, proposal.againstVoterList]);
    const nftHasVoted = votedNFTList.includes(activeNFT?.nftId);

    const initializeVotes = (proposal: Proposal) => {
        setVotes({ for: proposal.forVotes, against: proposal.againstVotes, abstain: proposal.refrainVotes });
    };

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
            case Status.INITIAL:
                return "#9370DB";
            default:
                return "#d36ba6";
        }
    };

    const fetchProposal = async () => {
        if (proposalId) {
            const proposalDetails = await fetchProposalDetails(proposalId);
            if (proposalDetails) {
                setProposal(proposalDetails);
                initializeVotes(proposalDetails);
            }
        }
    };

    const handleVote = async (vote: boolean) => {
        try {
            if (!activeNFT) {
                throw new Error("No active nft");
            }
            const txb = castVoteTxb(activeNFT.nftId, proposal.objectId, vote);
            const txnResponse = await wallet.signAndExecuteTransactionBlock({
                // @ts-expect-error transactionBlock type mismatch error between @suiet/wallet-kit and @mysten/sui.js
                transactionBlock: txb,
            });
            console.log("txnResponse", txnResponse);
            if (txnResponse?.digest) {
                console.log("Voting digest:", txnResponse?.digest);
                toast.success("Vote submitted successfully");
                setTimeout(() => {
                    fetchProposal();
                }, 5000);
            }
        } catch (error) {
            console.error("Error casting vote:", error);
        }
    };

    const handleChangeVote = async () => {
        try {
            if (!activeNFT) {
                throw new Error("No active nft");
            }
            const txb = changeVoteTxb(activeNFT.nftId, proposal.objectId);
            const txnResponse = await wallet.signAndExecuteTransactionBlock({
                // @ts-expect-error transactionBlock type mismatch error between @suiet/wallet-kit and @mysten/sui.js
                transactionBlock: txb,
            });
            console.log("txnResponse", txnResponse);
            if (txnResponse?.digest) {
                console.log("Voting Change digest:", txnResponse?.digest);
                setTimeout(() => {
                    fetchProposal();
                }, 5000);
            }
        } catch (error) {
            console.error("Error changing vote:", error);
        }
    };

    const handleRevokeVote = async () => {
        try {
            if (!activeNFT) {
                throw new Error("No active nft");
            }
            const txb = revokeVoteTxb(activeNFT.nftId, proposal.objectId);
            const txnResponse = await wallet.signAndExecuteTransactionBlock({
                // @ts-expect-error transactionBlock type mismatch error between @suiet/wallet-kit and @mysten/sui.js
                transactionBlock: txb,
            });
            console.log("txnResponse", txnResponse);
            if (txnResponse?.digest) {
                console.log("Voting digest:", txnResponse?.digest);
                setTimeout(() => {
                    fetchProposal();
                }, 5000);
            }
        } catch (error) {
            console.error("Error casting vote:", error);
        }
    };

    useEffect(() => {
        fetchProposal();
    }, [proposalId]);

    return (
        <>
            <div className="proposal-page w-full max-w-[1200px] mx-auto p-4 py-10">
                {/* <div className="flex items-center gap-6 mb-3">
                    <div className="name text-gray-500 md:text-xl text-lg">Proposal {proposal._id}</div>
                    <div
                        className="proposal-status p-3 m-2 text-white font-bold md:text-base text-xs"
                        style={{ backgroundColor: getStatusColor(proposal.status), borderRadius: "4px" }}
                    >
                        {proposal.status}
                    </div>
                </div> */}

                <div className="flex items-center justify-between border-b border-gray-500 mb-4">
                    <div className="flex items-center gap-2">
                        <div className="name md:text-4xl text-2xl">{proposal.title.replace(/^#\s*/, "")}</div>
                        <div
                            className="proposal-status p-3 m-2 text-white font-bold md:text-base text-xs"
                            style={{ backgroundColor: getStatusColor(proposal.status), borderRadius: "4px" }}
                        >
                            {proposal?.status}
                        </div>
                    </div>

                    {proposal?.status === Status.ACTIVE && (
                        <div className="my-4 flex justify-between py-4">
                            <div>
                                {wallet.connected ? (
                                    <>
                                        {!nftHasVoted ? (
                                            <>
                                                <div className="flex gap-2">
                                                    <button
                                                        onClick={() => handleVote(true)}
                                                        className="proposal-button px-4 py-4 bg-green-600 hover:bg-blue-500 text-white rounded-md"
                                                    >
                                                        In favor
                                                    </button>
                                                    <button
                                                        onClick={() => handleVote(false)}
                                                        className="proposal-button px-4 py-4 bg-red-600 hover:bg-blue-500 text-white rounded-md"
                                                    >
                                                        Oppose
                                                    </button>
                                                </div>
                                            </>
                                        ) : (
                                            <>
                                                <div className="flex gap-2">
                                                    <button
                                                        onClick={() => handleChangeVote()}
                                                        className="proposal-button px-4 py-4 bg-yellow-500 hover:bg-blue-500 text-white rounded-md"
                                                    >
                                                        Change Vote
                                                    </button>

                                                    <button
                                                        onClick={() => handleRevokeVote()}
                                                        className="proposal-button px-4 py-4 bg-red-600 hover:bg-blue-500 text-white rounded-md"
                                                    >
                                                        Refrain Vote
                                                    </button>
                                                </div>
                                            </>
                                        )}
                                    </>
                                ) : (
                                    <div className="flex items-center gap-10">
                                        <p>Connect wallet to vote</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </div>

                <div className="flex gap-4">
                    <div>
                        <Link to={`${SUI_EXPLORER_URL}/object/${proposal.objectId}`} target="_blank">
                            {proposal?.objectId ? (
                                <>
                                    Proposal Id:{" "}
                                    <span className="underline">
                                        {proposal.objectId.slice(0, 6)}...{proposal.objectId.slice(-6)}
                                    </span>
                                </>
                            ) : (
                                <></>
                            )}
                        </Link>
                    </div>

                    <div>
                        <Link to={`${SUI_EXPLORER_URL}/account/${proposal.proposer}`} target="_blank">
                            {proposal?.proposer ? (
                                <>
                                    Proposed By:{" "}
                                    <span className="underline">
                                        {proposal.proposer.slice(0, 6)}...{proposal.proposer.slice(-6)}
                                    </span>
                                </>
                            ) : (
                                <></>
                            )}
                        </Link>
                    </div>
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
                                <div className="text-gray-700  name  text-lg font-semibold">
                                    <p> {proposal.status === Status.ACTIVE ? "Ends On" : "Ended"}</p>
                                </div>
                                <div className="flex flex-col justify-end">
                                    <p className="text-xs font-bold">{proposal.endTime}</p>
                                </div>
                            </div>
                            {proposal.status === Status.EXECUTED && proposal.executedHash && (
                                <div className="bg-gray-200 rounded-lg p-4 flex items-center justify-around gap-2">
                                    <p className="text-gray-700 name text-lg font-semibold">Proposal Executed</p>
                                    <div className="flex flex-col justify-end">
                                        <p className="text-xs">Digest</p>
                                        <p className="text-base font-bold underline">
                                            <Link
                                                to={`${SUI_EXPLORER_URL}/tx/${proposal.executedHash}`}
                                                target="_blank"
                                            >
                                                {proposal.executedHash.slice(0, 5)}...{proposal.executedHash.slice(-5)}
                                            </Link>
                                        </p>
                                    </div>
                                </div>
                            )}
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
