import { TransactionBlock } from "@mysten/sui.js/transactions";
import { SUI_CLOCK_OBJECT_ID } from "@mysten/sui.js/utils";
import axios, { AxiosResponse } from "axios";

const PACKAGE_ID = import.meta.env.VITE_APP_PACKAGE_ID as string;
const BACKEND_URL = import.meta.env.VITE_APP_BACKEND_URL as string;

export const createBidAuctionTxb = (amount: number, auctionInfoId: string) => {
    try {
        const txb = new TransactionBlock();
        const coin = txb.splitCoins(txb.gas, [txb.pure(amount)]);
        txb.moveCall({
            target: `${PACKAGE_ID}::auction::bid`,
            arguments: [txb.object(auctionInfoId), txb.object(SUI_CLOCK_OBJECT_ID), coin],
            typeArguments: ["0x2::sui::SUI"],
        });

        return txb;
    } catch (err) {
        console.log(err);
        throw err;
    }
};

// Todo: move to types files
interface Fund {
    _id: string;
    address: string;
    balance: number;
}

export interface Auction {
    _id: string;
    uid: string;
    nftImage: string;
    nftName: string;
    nftDescription: string;
    title: string;
    description: string;
    amount: number;
    reservePrice: number;
    duration: number;
    startTime: string;
    endTime: string;
    minBidIncrementPercentage: number;
    settled: boolean;
    funds: Fund[];
    createdAt: string;
    __v: number;
    highestBidder: string;
}

export const getActiveAuctionDetails = async (): Promise<Auction | null> => {
    try {
        const response: AxiosResponse<Auction> = await axios.get<Auction>(`${BACKEND_URL}/v1/auction/active`);
        return response.data;
    } catch (err) {
        console.error("Error fetching auction data:", err);
        return null;
    }
};
