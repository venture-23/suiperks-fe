import { useWallet } from "@suiet/wallet-kit";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";

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
                description: `# Proposal Title 2

## **TLDR** 
Asking for 45,625 USDC to audit the $nouns ERC20 token contract and DAO upgrade with Sherlock.

## **Context** 
The $nouns token is designed to be the canonical ERC20 token backed by Nouns. Any Noun could be deposited into the $nouns contract in order to mint e.g. 1M $nouns. Anyone holding 1M $nouns would be able to redeem them for a Noun from the $nouns contract.

For deeper context please see:

- The token spec.
- A discussion thread about the spec.

## **Scope** 
We’re deploying a new token factory on mainnet, that lets anyone create a new NFT-backed ERC20 token:

- They have a fixed exchange rate, e.g. 1 NFT = 1M ERC20 tokens.
- The ERC20 token has an Owner account that can upgrade it, as well as disable future upgrades.

We’re upgrading the Nouns DAO logic contract, such that it treats its $nouns akin to how it treats DAO-owned Nouns:

- The DAO’s Nouns redeemable balance is excluded from adjusted total supply.
- One of the DAO’s fork parameters is the list of ERC20 tokens that get sent to fork DAOs; this upgrade rejects attempts to add the $nouns address to this list (again, similar to how we do not send Nouns to fork DAOs today).

For a deeper dive you are welcome to review the NFT-backed token Github repository, and the DAO upgrade PR.
`,
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

    const handleVote = () => {
        console.log("vote");
    };

    return (
        <>
            <div className="proposal-page w-full md:mx-40 my-10 mx-4">
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
                            {proposal.description}
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
                                    <p className="text-base font-bold">{proposal.threshold}</p>
                                </div>
                            </div>
                            <div className="bg-gray-200 rounded-lg p-4 flex items-center justify-around gap-2">
                                <p className="text-gray-700  name  text-lg font-semibold">
                                    <p> {proposal.status === "Active" ? "Ends On" : "Ended"}</p>
                                </p>
                                <div className="flex flex-col justify-end">
                                    <p className="text-xs font-bold">{proposal.endTime}</p>
                                </div>
                            </div>
                            <div className="bg-gray-200 rounded-lg p-4 flex items-center justify-around gap-2">
                                <p className="text-gray-700 name  text-lg font-semibold">Snapshot</p>
                                <div className="flex flex-col justify-end">
                                    <p className="text-xs">Taken at block</p>
                                    <p className="text-base font-bold">{proposal.snapshot}</p>
                                </div>
                            </div>
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
    description?: string;
};

type Votes = {
    for: number;
    against: number;
    abstain: number;
};
