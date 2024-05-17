import React, { useEffect, useState } from "react";
import { Proposal, Status, fetchAllProposals } from "../../services/proposalServices";

interface QueueTableProps {
    proposals: Proposal[] | null;
    onQueueClick?: (_id: string, updatedProposals: Proposal[]) => void;
    onExecuteClick?: (_id: string) => void;
}

const QueueTable: React.FC<QueueTableProps> = ({ proposals = null, onQueueClick, onExecuteClick }) => {
    const [updatedProposals, setUpdatedProposals] = useState<Proposal[]>(proposals || []);
    const [loading, setLoading] = useState(false);

    const handleQueueClick = (_id: string) => {
        console.log(`Proposal ${_id} queued`);
        const updatedProposal = updatedProposals.find((proposal) => proposal._id === _id);
        if (updatedProposal) {
            updatedProposal.status = Status.QUEUE;
            setUpdatedProposals([...updatedProposals]);
            if (onQueueClick) {
                onQueueClick(_id, updatedProposals);
            }
        }
    };

    const handleExecuteClick = (_id: string) => {
        console.log(`Proposal ${_id} executed`);
        const updatedProposal = updatedProposals.find((proposal) => proposal._id === _id);
        if (updatedProposal) {
            updatedProposal.status = Status.ACTIVE;
            setUpdatedProposals([...updatedProposals]);
            if (onExecuteClick) {
                onExecuteClick(_id);
            }
        }
    };

    const fetchAllProposalsData = async () => {
        setLoading(true);
        try {
            const allProposals = await fetchAllProposals();
            if (allProposals) {
                setUpdatedProposals(allProposals);
            } else {
                throw new Error("Failed to fetch proposals.");
            }
        } catch (error) {
            console.error("Error fetching all proposals:", error);
        } finally {
            setLoading(false);
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
                                {proposal.status === "Waiting" && (
                                    <button
                                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                        onClick={() => handleQueueClick(proposal._id)}
                                    >
                                        Queue
                                    </button>
                                )}
                                {proposal.status === "Queue" && (
                                    <button
                                        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                                        onClick={() => handleExecuteClick(proposal._id)}
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
