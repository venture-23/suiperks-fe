import axios, { AxiosResponse } from "axios";

const BACKEND_URL = import.meta.env.VITE_APP_BACKEND_URL as string;

export interface UserOwnedNFT {
    nftImage: string;
    nftName: string;
    nftDescription: string;
    nftId: string;
    nftOwner: string;
}

interface OwnedNFTRes {
    type: string;
    statusCode: number;
    message: string;
    ownedNFT: UserOwnedNFT[];
}

export const fetchUserOwnedNFTs = async (walletAddress: string): Promise<UserOwnedNFT[]> => {
    try {
        const response: AxiosResponse<OwnedNFTRes> = await axios.get<OwnedNFTRes>(
            `${BACKEND_URL}/v1/user-nfts/${walletAddress}`
        );

        return response.data.ownedNFT;
    } catch (err) {
        console.error("Error fetching user owned nfts data:", err);
        return [];
    }
};

export const fetchUserPoints = async (walletAddress: string): Promise<number> => {
    try {
        const response: AxiosResponse = await axios.get(`${BACKEND_URL}/v1/point/${walletAddress}`);
        return response.data.point;
    } catch (err) {
        console.error("Error fetching points", err);
        return 0;
    }
};
