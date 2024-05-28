import axios, { AxiosResponse } from "axios";
import { TransactionBlock } from "@mysten/sui.js/transactions";
import { SUI_CLOCK_OBJECT_ID } from "@mysten/sui.js/utils";

const PACKAGE_ID = import.meta.env.VITE_APP_PACKAGE_ID as string;
const DAO_ID = import.meta.env.VITE_APP_DAO_ID as string;
const TREASURY_ID = import.meta.env.VITE_APP_DAO_TREASURY_ID as string;
const BACKEND_URL = import.meta.env.VITE_APP_BACKEND_URL as string;

export enum Status {
    WAITING = "Waiting",
    ACTIVE = "Active",
    FAILED = "Failed",
    QUEUE = "Queue",
    EXECUTED = "Executed",
    INITIAL = "Initial",
}

export interface Proposal {
    index_id?: number;
    _id: string;
    title: string;
    details: string;
    forVotes: number;
    againstVotes: number;
    refrainVotes: number;
    eta: number;
    actionDelay: number;
    hash: string;
    seekAmount: number;
    executable: boolean;
    status: Status;
    forVoterList: any[];
    refrainVoterList: any[];
    againstVoterList: any[];
    createdAt: string;
    __v: number;
    endTime: string;
    objectId: string;
    proposer: string;
    quorumVotes: number;
    startTime: string;
    votingQuorumRate: number;
    executedHash: string;
}

export interface ProposalCreate {
    title: string;
    details: string;
    forVotes: number;
    againstVotes: number;
    eta: number;
    actionDelay: number;
    hash: string;
    seekAmount: number;
    executable: boolean;
    status: string;
    _id: string;
    forVoterList: string[];
    againstVoterList: string[];
    createdAt: string;
    __v: number;
}

export const fetchAllProposals = async (): Promise<Proposal[] | null> => {
    try {
        const response: AxiosResponse<Proposal[]> = await axios.get<Proposal[]>(`${BACKEND_URL}/v1/proposal/all`);
        return response.data;
    } catch (error) {
        console.error("Error fetching proposals.", error);
        return null;
    }
};

export const fetchProposalDetails = async (proposal_id: string): Promise<Proposal | null> => {
    try {
        const response: AxiosResponse<Proposal> = await axios.get<Proposal>(
            `${BACKEND_URL}/v1/proposal/${proposal_id}`
        );
        return response.data;
    } catch (error) {
        console.error("Error fetching proposal.", error);
        return null;
    }
};

export const createProposal = async (title: string, details: string): Promise<ProposalCreate | null> => {
    try {
        const response: AxiosResponse<ProposalCreate> = await axios.post<ProposalCreate>(
            `${BACKEND_URL}/v1/proposal/create`,
            {
                title: title,
                details: details,
            }
        );
        console.log(response);
        return response.data;
    } catch (error) {
        console.error("Error creating proposal:", error);
        return null;
    }
};

export const createProposalTxb = (userNFTId: string, proposalHash: string, seekingAmount: number) => {
    try {
        const txb = new TransactionBlock();
        const proposal = txb.moveCall({
            target: `${PACKAGE_ID}::ethena_dao::propose`,
            arguments: [
                txb.object(DAO_ID), // Dao<DaoWitness>
                txb.object(userNFTId), // 0xDaoNFT,
                txb.object(SUI_CLOCK_OBJECT_ID), // quorum_votes,
                txb.pure.string(proposalHash), // hash proposal title/content
                txb.pure.u64(`${seekingAmount}`), // seek_amount
            ],
        });
        txb.moveCall({
            target: `${PACKAGE_ID}::ethena_dao::add_proposal_dynamically`,
            arguments: [txb.object(DAO_ID), proposal],
        });

        return txb;
    } catch (err) {
        console.log(err);
        throw err;
    }
};

export const queueProposalTxb = (proposalId: string) => {
    try {
        const txb = new TransactionBlock();
        txb.moveCall({
            target: `${PACKAGE_ID}::ethena_dao::queue`,
            arguments: [
                txb.object(DAO_ID),
                txb.pure.address(proposalId), // Proposal<DaoWitness>
                txb.object(SUI_CLOCK_OBJECT_ID), // clock
            ],
        });

        return txb;
    } catch (err) {
        console.log(err);
        throw err;
    }
};

export const executeProposalTxb = (proposalId: string) => {
    try {
        const txb = new TransactionBlock();
        txb.moveCall({
            target: `${PACKAGE_ID}::ethena_dao::execute`,
            arguments: [
                txb.object(DAO_ID),
                txb.pure.address(proposalId), // Proposal<DaoWitness>
                txb.object(TREASURY_ID),
                txb.object(SUI_CLOCK_OBJECT_ID), // clock
            ],
            typeArguments: ["0x2::sui::SUI"],
        });

        return txb;
    } catch (err) {
        console.log(err);
        throw err;
    }
};

export const castVoteTxb = (userNFTId: string, proposalId: string, voteValue: boolean) => {
    try {
        const txb = new TransactionBlock();
        txb.moveCall({
            target: `${PACKAGE_ID}::ethena_dao::cast_vote`,
            arguments: [
                txb.object(DAO_ID),
                txb.pure.address(proposalId), // Proposal<DaoWitness>
                txb.object(userNFTId), // 0xDaoNft
                txb.object(SUI_CLOCK_OBJECT_ID), // clock
                txb.pure.bool(voteValue), // yes or no vote
            ],
        });
        return txb;
    } catch (err) {
        console.log(err);
        throw err;
    }
};

export const changeVoteTxb = (userNFTId: string, proposalId: string) => {
    try {
        const txb = new TransactionBlock();
        txb.moveCall({
            target: `${PACKAGE_ID}::ethena_dao::change_vote`,
            arguments: [
                txb.object(DAO_ID),
                txb.pure.address(proposalId), // Proposal<DaoWitness>
                txb.object(userNFTId), // clock
                txb.object(SUI_CLOCK_OBJECT_ID),
            ],
        });

        return txb;
    } catch (err) {
        console.log(err);
        throw err;
    }
};

export const revokeVoteTxb = (userNFTId: string, proposalId: string) => {
    try {
        const txb = new TransactionBlock();
        txb.moveCall({
            target: `${PACKAGE_ID}::ethena_dao::revoke_vote`,
            arguments: [
                txb.object(DAO_ID),
                txb.pure.address(proposalId), // Proposal<DaoWitness>
                txb.object(userNFTId), // clock
                txb.object(SUI_CLOCK_OBJECT_ID),
            ],
        });

        return txb;
    } catch (err) {
        console.log(err);
        throw err;
    }
};

export const updateProposalFailStatus = async (proposalId: string) => {
    const res = await axios.post(`${BACKEND_URL}/v1/proposal/failed`, {
        proposalId: proposalId,
    });

    if (res.status === 200) {
        return true;
    }
};
