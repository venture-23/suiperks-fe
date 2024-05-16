import { TransactionBlock } from "@mysten/sui.js/transactions";
import { SUI_CLOCK_OBJECT_ID } from "@mysten/sui.js/utils";
import axios from "axios";

const PACKAGE_ID = import.meta.env.VITE_APP_PACKAGE_ID as string;
const BACKEND_URL = import.meta.env.VITE_APP_BACKEND_URL as string;

export const createCreateEventTxb = () => {
    try {
        const txb = new TransactionBlock();
        txb.moveCall({
            target: `${PACKAGE_ID}::auction::create_auction`,
            arguments: [txb.pure.u64("100000000"), txb.object(SUI_CLOCK_OBJECT_ID)],
            typeArguments: ["0x2::sui::SUI"],
        });

        return txb;
    } catch (err) {
        console.log(err);
        throw err;
    }
};

type createAuctionReqBody = {
    title: string;
    description: string;
    nftName: string;
    nftDescription: string;
    nftImage: string;
};

export const createAuction = async (body: createAuctionReqBody) => {
    try {
        const response = await axios.post(`${BACKEND_URL}/v1/auction/create`, body, {
            headers: {
                "Content-Type": "application/json",
            },
        });
        return response.data;
    } catch (err) {
        console.error("Error creating auction:", err);
        return null;
    }
};

type settleAuctionReqBody = {
    auctionInfo: string;
    nftName: string;
    nftDescription: string;
    nftImage: string;
};

export const settleAuction = async (body: settleAuctionReqBody) => {
    try {
        const response = await axios.post(`${BACKEND_URL}/v1/auction/settle`, body, {
            headers: {
                "Content-Type": "application/json",
            },
        });
        return response.data;
    } catch (err) {
        console.error("Error settling auction:", err);
        return null;
    }
};
