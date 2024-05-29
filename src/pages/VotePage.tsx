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

const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    return `${hours}:${minutes} ${day}-${month}-${year}`;
};

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
        refrainVoterList: [],
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
    const [showAllForVoters, setShowAllForVoters] = useState(false);
    const [showAllRefrainVoters, setShowAllRefrainVoters] = useState(false);
    const [showAllAgainstVoters, setShowAllAgainstVoters] = useState(false);
    const [loading, setLoading] = useState(true);

    const wallet = useWallet();
    const { activeNFT } = useAppContext();
    const votedNFTList = useMemo(() => {
        const forVoters = proposal.forVoterList.map((item) => item.nftId);
        const againstVoters = proposal.againstVoterList.map((item) => item.nftId);
        const refrainVoterList = proposal.refrainVoterList.map((item) => item.nftId);
        return [...forVoters, ...againstVoters, ...refrainVoterList];
    }, [proposal.forVoterList, proposal.againstVoterList, proposal.refrainVoterList]);
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
        setLoading(true);
        if (proposalId) {
            const proposalDetails = await fetchProposalDetails(proposalId);
            if (proposalDetails) {
                setProposal(proposalDetails);
                initializeVotes(proposalDetails);
            }
            setLoading(false);
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
    const ForVotersToDisplay = showAllForVoters ? proposal.forVoterList : proposal.forVoterList.slice(0, 4);
    const AgainstVotersToDisplay = showAllAgainstVoters
        ? proposal.againstVoterList
        : proposal.againstVoterList.slice(0, 4);
    const RefrainVotersToDisplay = showAllRefrainVoters
        ? proposal.refrainVoterList
        : proposal.refrainVoterList.slice(0, 4);

    useEffect(() => {
        fetchProposal();
    }, [proposalId]);

    if (loading) {
        return <div className="name w-full max-w-[1200px] mx-auto p-4 py-10 text-xl">Loading...</div>;
    }

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

                <div className="flex flex-col md:flex-row items-center justify-between border-b border-gray-500 mb-4">
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
                                                {proposal.refrainVoterList
                                                    .map((item) => item.nftId)
                                                    .includes(activeNFT?.nftId) ? (
                                                    <div>You have refrained from voting.</div>
                                                ) : (
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
                                                )}
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

                <div className="flex md:flex-row flex-col gap-4 items-center">
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

                <div className="font-semibold">Seeking Amount: {proposal.seekAmount * 10 ** -9} SUI</div>

                <div className="flex md:flex-row flex-col gap-10">
                    <div className="md:w-3/4">
                        <div>
                            <div className="text-[#1c0971] font-semibold md:text-4xl text-2xl name py-4">
                                Description
                            </div>
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

                        {(proposal.forVotes !== 0 || proposal.againstVotes !== 0 || proposal.refrainVotes !== 0) && (
                            <div className="mt-8 border-t border-gray-500">
                                <h3 className="text-[#1c0971] font-semibold md:text-4xl text-2xl name py-4">
                                    Voters List
                                </h3>
                                <div className="flex flex-col md:flex-row md:gap-14">
                                    <div className="mb-4 bg-gray-200 rounded-lg px-8 py-6 md:w-1/3">
                                        <h4 className="name text-lg font-semibold mb-2">In Favor</h4>
                                        {proposal.forVotes !== 0 ? (
                                            <ul className="flex flex-col gap-2">
                                                {ForVotersToDisplay.map((voter, index) => (
                                                    <Link
                                                        to={`${SUI_EXPLORER_URL}/object/${voter.nftId}`}
                                                        target="_blank"
                                                        key={index}
                                                        className="flex items-center gap-2"
                                                    >
                                                        <div
                                                            className="w-[40px] h-[40px]"
                                                            style={{ borderRadius: "50%" }}
                                                        >
                                                            <img
                                                                src={voter.nftImage}
                                                                alt=""
                                                                className="w-full h-full object-cover"
                                                                style={{ borderRadius: "inherit" }}
                                                            />
                                                        </div>
                                                        <li className="py-3 underline">
                                                            {voter.nftId.slice(0, 6)}...{voter.nftId.slice(-6)}
                                                        </li>
                                                    </Link>
                                                ))}
                                            </ul>
                                        ) : (
                                            <p className="text-center pt-4">No For Votes</p>
                                        )}
                                        {!showAllForVoters && proposal.forVoterList.length > 4 && (
                                            <button
                                                className="name py-2 mt-2 font-bold text-center text-sm"
                                                onClick={() => setShowAllForVoters(true)}
                                            >
                                                View All
                                            </button>
                                        )}

                                        {showAllForVoters && (
                                            <button
                                                className="name py-2 mt-2 font-bold text-center text-sm"
                                                onClick={() => setShowAllForVoters(false)}
                                            >
                                                View Less
                                            </button>
                                        )}
                                    </div>

                                    <div className="mb-4 bg-gray-200 rounded-lg px-8 py-6 md:w-1/3">
                                        <h4 className="name text-lg font-semibold mb-2">Against</h4>
                                        {proposal.againstVotes !== 0 ? (
                                            <ul className="flex flex-col gap-2">
                                                {AgainstVotersToDisplay.map((voter, index) => (
                                                    <Link
                                                        to={`${SUI_EXPLORER_URL}/object/${voter.nftId}`}
                                                        target="_blank"
                                                        key={index}
                                                        className="flex items-center gap-2"
                                                    >
                                                        <div
                                                            className="w-[40px] h-[40px]"
                                                            style={{ borderRadius: "50%" }}
                                                        >
                                                            <img
                                                                src={voter.nftImage}
                                                                alt=""
                                                                className="w-full h-full object-cover"
                                                                style={{ borderRadius: "inherit" }}
                                                            />
                                                        </div>
                                                        <li className="py-3 underline">
                                                            {voter.nftId.slice(0, 6)}...{voter.nftId.slice(-6)}
                                                        </li>
                                                    </Link>
                                                ))}
                                            </ul>
                                        ) : (
                                            <p className="text-center pt-4">No Against Votes</p>
                                        )}
                                        {!showAllAgainstVoters && proposal.againstVoterList.length > 4 && (
                                            <button
                                                className="name py-2 mt-2 font-bold text-center text-sm"
                                                onClick={() => setShowAllAgainstVoters(true)}
                                            >
                                                View All
                                            </button>
                                        )}

                                        {showAllAgainstVoters && (
                                            <button
                                                className="name py-2 mt-2 font-bold text-center text-sm"
                                                onClick={() => setShowAllAgainstVoters(false)}
                                            >
                                                View Less
                                            </button>
                                        )}
                                    </div>

                                    <div className="mb-4 bg-gray-200 rounded-lg px-8 py-6 md:w-1/3">
                                        <h4 className="name text-lg font-semibold mb-2">Refrain</h4>
                                        {proposal.refrainVotes !== 0 ? (
                                            <ul className="list-none list-inside">
                                                {RefrainVotersToDisplay.map((voter, index) => (
                                                    <Link
                                                        to={`${SUI_EXPLORER_URL}/object/${voter.nftId}`}
                                                        target="_blank"
                                                        key={index}
                                                    >
                                                        <li className="py-3 underline">
                                                            {voter.nftId.slice(0, 6)}...{voter.nftId.slice(-6)}
                                                        </li>
                                                    </Link>
                                                ))}
                                            </ul>
                                        ) : (
                                            <p className="text-center pt-4">No Refrain Votes</p>
                                        )}
                                        <div className="flex justify-center mt-2">
                                            {!showAllRefrainVoters && proposal.refrainVoterList.length > 4 && (
                                                <button
                                                    className="name py-2 mt-2 font-bold text-center text-sm"
                                                    onClick={() => setShowAllRefrainVoters(true)}
                                                >
                                                    View All
                                                </button>
                                            )}

                                            {showAllRefrainVoters && (
                                                <button
                                                    className="name py-2 mt-2 font-bold text-center text-sm"
                                                    onClick={() => setShowAllRefrainVoters(false)}
                                                >
                                                    View Less
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="votes md:w-1/4 flex flex-col md:border-t-0 border-t border-gray-500">
                        <div className="flex flex-col justify-around">
                            <div className="text-[#1c0971] font-semibold lg:text-4xl text-2xl name py-4">Votes</div>

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
                                <p className="text-[#1c0971] name  text-lg font-semibold">Threshold</p>
                                <div className="flex flex-col justify-end">
                                    <p className="text-xs">Current Threshold</p>
                                    <p className="text-base font-bold">{proposal.votingQuorumRate}%</p>
                                </div>
                            </div>
                            <div className="bg-gray-200 rounded-lg p-4 flex items-center justify-around gap-2">
                                <div className="text-[#1c0971]  name  text-lg font-semibold">
                                    <p> {proposal.status === Status.ACTIVE ? "Ends On" : "Ended"}</p>
                                </div>
                                <div className="flex flex-col justify-end">
                                    <p className="text-xs font-bold">{formatDate(proposal.endTime)}</p>
                                </div>
                            </div>
                            {proposal.status === Status.EXECUTED && proposal.executedHash && (
                                <div className="bg-gray-200 rounded-lg p-4 flex items-center justify-around gap-2">
                                    <p className="text-[#1c0971] name text-lg font-semibold">Proposal Executed</p>
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
