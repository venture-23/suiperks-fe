import axios, { AxiosResponse } from "axios";

const BACKEND_URL = import.meta.env.VITE_APP_BACKEND_URL as string;

export interface Activity {
    _id: string;
    type: string;
    txDigest: string;
    sender: string;
    nftId: string;
    message: string;
    createdAt: string;
}

export interface NftDetails {
    _id: string;
    nftId: string;
    nftImage: string;
    nftName: string;
    nftDescription: string;
    nftOwner: string;
    activity: Activity[];
}

export interface AuctionDetails {
    _id: string;
    nftId: string;
    nftImage: string;
    nftName: string;
    nftDescription: string;
    title: string;
    description: string;
    amount: number;
    highestBidder: string;
}

export const getAuctionHistory = async (): Promise<AuctionDetails[]> => {
    try {
        const response: AxiosResponse<AuctionDetails[]> = await axios.get<AuctionDetails[]>(
            `${BACKEND_URL}/v1/auction/winners`
        );
        return response.data;
    } catch (err) {
        console.error("Error fetching auction history:", err);
        return [];
    }
};

export const getNftDetails = async (NftId: string): Promise<NftDetails> => {
    try {
        const response: AxiosResponse<NftDetails> = await axios.get<NftDetails>(`${BACKEND_URL}/v1/activity/${NftId}`);
        return response.data;
    } catch (err) {
        console.error("Error fetching nft details:", err);
        throw err;
    }
};
