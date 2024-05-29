import axios from "axios";

const BACKEND_URL = import.meta.env.VITE_APP_BACKEND_URL as string;

export interface TreasuryBalanceResponse {
    balance: number;
}

export const fetchTreasuryBalance = async (): Promise<TreasuryBalanceResponse> => {
    try {
        const response = await axios.get<TreasuryBalanceResponse>(`${BACKEND_URL}/v1/treasury-balance`);
        return response.data;
    } catch (error) {
        throw new Error("Error fetching treasury balance");
    }
};
