import { TransactionBlock } from "@mysten/sui.js/transactions";
import axios from "axios";

const BACKEND_URL = import.meta.env.VITE_APP_BACKEND_URL as string;
const PACKAGE_ID = import.meta.env.VITE_APP_PACKAGE_ID as string;
const DIRECTORY_ID = import.meta.env.VITE_APP_DIRECTORY_ID as string;

export const fetchRewardsClaimingStatus = async (): Promise<number | undefined> => {
    try {
        const response = await axios.get(`${BACKEND_URL}/v1/token/`);
        return response.data;
    } catch (err) {
        console.error("Error fetching rewards claim state.", err);
    }
};

export const updateRewardsClaimStatus = async (status: boolean): Promise<boolean> => {
    try {
        await axios.get(`${BACKEND_URL}/v1/token/action?pause=${status}`);
        return true;
    } catch (err) {
        console.error("Error updating rewards claim state.", err);
        return false;
    }
};

export const makeAirdrop = async (): Promise<boolean> => {
    try {
        await axios.get(`${BACKEND_URL}/v1/token/airdrop`);
        return true;
    } catch (err) {
        console.error("Error making airdrop.", err);
        return false;
    }
};

export const createClaimRewardTxb = (walletAddress: string) => {
    try {
        const txb = new TransactionBlock();
        txb.moveCall({
            target: `${PACKAGE_ID}::oxcoin::claim_voter_reward`,
            arguments: [txb.object(DIRECTORY_ID), txb.object(walletAddress)],
        });

        return txb;
    } catch (err) {
        console.log(err);
        throw err;
    }
};
