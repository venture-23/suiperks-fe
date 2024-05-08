import axios, { AxiosResponse } from "axios";

const BACKEND_URL = import.meta.env.VITE_APP_BACKEND_URL as string;

export interface AuctionDetails {
    _id: string;
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
        const response: AxiosResponse<AuctionDetails[]> = await axios.get<AuctionDetails[]>(`${BACKEND_URL}/winners`);
        return response.data;
    } catch (err) {
        console.error("Error fetching auction history:", err);
        return [];
    }
};
