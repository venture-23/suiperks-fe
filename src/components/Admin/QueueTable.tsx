import React, { useState } from "react";

interface Proposal {
    _id: string;
    title: string;
    Status: string;
}

interface QueueTableProps {
    proposals: Proposal[];
    onQueueClick?: (_id: string, updatedProposals: Proposal[]) => void;
    onExecuteClick?: (_id: string) => void;
}

const QueueTable: React.FC<QueueTableProps> = ({ proposals, onQueueClick, onExecuteClick }) => {
    const [updatedProposals, setUpdatedProposals] = useState<Proposal[]>(proposals);

    const handleQueueClick = (_id: string) => {
        console.log(`Proposal ${_id} queued`);
        const updatedProposal = updatedProposals.find((proposal) => proposal._id === _id);
        if (updatedProposal) {
            updatedProposal.Status = "Queue";
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
            updatedProposal.Status = "Active";
            setUpdatedProposals([...updatedProposals]);
            if (onExecuteClick) {
                onExecuteClick(_id);
            }
        }
    };

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
                            <td className="border border-black p-2 text-center">{proposal.title}</td>
                            <td className="border border-black p-2 text-center">{proposal.Status}</td>
                            <td className="border border-black p-2 text-center">
                                {proposal.Status === "Waiting" && (
                                    <button
                                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                        onClick={() => handleQueueClick(proposal._id)}
                                    >
                                        Queue
                                    </button>
                                )}
                                {proposal.Status === "Queue" && (
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
