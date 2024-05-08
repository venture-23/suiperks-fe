import { TransactionBlock } from "@mysten/sui.js/transactions";
import { SUI_CLOCK_OBJECT_ID } from "@mysten/sui.js/utils";
import axios, { AxiosResponse } from "axios";

const PACKAGE_ID = import.meta.env.VITE_APP_PACKAGE_ID as string;
const BACKEND_URL = import.meta.env.VITE_APP_BACKEND_URL as string;

export const createBidAuctionTxb = (amount: number, auctionInfoId: string) => {
    try {
        const tx = new TransactionBlock();
        const coin = tx.splitCoins(tx.gas, [tx.pure(amount)]);
        tx.moveCall({
            target: `${PACKAGE_ID}::auction::bid`,
            arguments: [
                tx.object(auctionInfoId),
                tx.object(SUI_CLOCK_OBJECT_ID),
                coin,
            ],
            typeArguments: ["0x2::sui::SUI"],
        });

        return tx;
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

interface Auction {
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
        const response: AxiosResponse<Auction> = await axios.get<Auction>(`${BACKEND_URL}/active`);
        return response.data;
    } catch (err) {
        console.error('Error fetching auction data:', err);
        return null;
    }
}
