import axios, { AxiosResponse } from 'axios';

const BACKEND_URL = import.meta.env.VITE_APP_BACKEND_URL as string;

export enum Status {
    WAITING = 'Waiting',
    ACTIVE = 'Active',
    FAILED = 'Failed',
    QUEUE = 'Queue',
    EXECUTED = 'Executed',
}

export interface Proposal {
    _id: string;
    title: string;
    details: string;
    forVotes: number;
    againstVotes: number;
    eta: number;
    actionDelay: number;
    hash: string;
    seekAmount: number;
    executable: boolean;
    status: Status;
    forVoterList: any[]; 
    againstVoterList: any[];
    createdAt: string;
    __v: number;
    endTime: string;
    objectId: string;
    proposer: string;
    quorumVotes: number;
    startTime: string;
    votingQuorumRate: number;
}

export const fetchAllProposals = async (): Promise<Proposal[] | null> => {
    try {
        const response: AxiosResponse<Proposal[]> = await axios.get<Proposal[]>(`${BACKEND_URL}/v1/proposal/all`);
        return response.data;
    } catch (error) {
        console.error('Error fetching proposals:', error);
        return null;
    }
};
