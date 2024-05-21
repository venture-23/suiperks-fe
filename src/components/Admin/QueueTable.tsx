import { useEffect, useState } from "react";
import {
    Proposal,
    Status,
    executeProposalTxb,
    fetchAllProposals,
    queueProposalTxb,
} from "../../services/proposalServices";
import { useWallet } from "@suiet/wallet-kit";
import { toast } from "react-toastify";

const QueueTable = () => {
    const [updatedProposals, setUpdatedProposals] = useState<Proposal[]>([]);
    const wallet = useWallet();

    const handleQueueClick = async (proposalId: string) => {
        try {
            console.log(`Proposal ${proposalId} queued`);

            const txb = queueProposalTxb(proposalId);
            const txnResponse = await wallet.signAndExecuteTransactionBlock({
                // @ts-expect-error transactionBlock type mismatch error between @suiet/wallet-kit and @mysten/sui.js
                transactionBlock: txb,
            });
            console.log("Queue txnResponse", txnResponse);
            if (txnResponse?.digest) {
                console.log("Queue digest:", txnResponse?.digest);
                toast.success("Proposal queued successfully");

                const updatedProposal = updatedProposals.find((proposal) => proposal.objectId === proposalId);
                if (updatedProposal) {
                    updatedProposal.status = Status.QUEUE;
                    setUpdatedProposals([...updatedProposals]);
                }
            }
        } catch (err) {
            console.log("Settle failed.", err);
            toast.error("Proposal queue failed");

            // Add queue failed API call here.
        }
    };

    const handleExecuteClick = async (proposalId: string) => {
        try {
            console.log(`Proposal ${proposalId} queued`);

            const txb = executeProposalTxb(proposalId);
            const txnResponse = await wallet.signAndExecuteTransactionBlock({
                // @ts-expect-error transactionBlock type mismatch error between @suiet/wallet-kit and @mysten/sui.js
                transactionBlock: txb,
            });
            console.log("Execute txnResponse", txnResponse);
            if (txnResponse?.digest) {
                console.log("Queue digest:", txnResponse?.digest);
                toast.success("Proposal executed successfully");

                const updatedProposal = updatedProposals.find((proposal) => proposal.objectId === proposalId);
                if (updatedProposal) {
                    updatedProposal.status = Status.ACTIVE;
                    setUpdatedProposals([...updatedProposals]);
                }
            }
        } catch (err) {
            console.log("Execute failed.", err);
            toast.error("Proposal execution failed");
        }
    };

    const fetchAllProposalsData = async () => {
        try {
            const allProposals = await fetchAllProposals();
            if (allProposals) {
                setUpdatedProposals(allProposals);
            } else {
                throw new Error("Failed to fetch proposals.");
            }
        } catch (error) {
            console.error("Error fetching all proposals:", error);
        }
    };

    useEffect(() => {
        fetchAllProposalsData();
    }, []);

    return (
        <div className="md:w-3/5 w-4/5 mx-auto my-5">
            <table className="table-auto w-full border-collapse border border-black rounded-md">
                <thead>
                    <tr>
                        <th className="border border-black p-2">Proposal Title</th>
                        <th className="border border-black p-2">Status</th>
                        <th className="border border-black p-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {updatedProposals.map((proposal) => (
                        <tr key={proposal._id}>
                            <td className="border border-black p-2 text-center">
                                {proposal.title.replace(/^#\s*/, "")}
                            </td>
                            <td className="border border-black p-2 text-center">{proposal.status}</td>
                            <td className="border border-black p-2 text-center">
                                {proposal.status === Status.WAITING && (
                                    <button
                                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                        onClick={() => handleQueueClick(proposal.objectId)}
                                    >
                                        Queue
                                    </button>
                                )}
                                {proposal.status === Status.QUEUE && (
                                    <button
                                        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                                        onClick={() => handleExecuteClick(proposal.objectId)}
                                    >
                                        Execute
                                    </button>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default QueueTable;
