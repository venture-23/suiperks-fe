import React, { createContext, useState, useContext, ReactNode, useEffect } from "react";
import { UserOwnedNFT, fetchUserOwnedNFTs } from "../services/userServices";
import { useWallet } from "@suiet/wallet-kit";
import { TreasuryBalanceResponse, fetchTreasuryBalance } from "../services/treauryService";
import { fetchRewardsClaimingStatus } from "../services/rewardsServices";

interface AppContextType {
    userOwnedNFTs: UserOwnedNFT[];
    updatedUserOwnedNFTs: (nfts: UserOwnedNFT[]) => void;
    treasuryBalance: number | undefined;
    updateTreasuryBalance: () => void;
    activeNFT: UserOwnedNFT | null;
    updateActiveNFT: (nftDetails: UserOwnedNFT) => void;
    rewardsClaimStatus: boolean;
    updateRewardsClaimPeriodStatus: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

interface AppProviderProps {
    children: ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
    const wallet = useWallet();
    const [userOwnedNFTs, setUserOwnedNFTs] = useState<UserOwnedNFT[]>([]);
    const [activeNFT, setActiveNFT] = useState<UserOwnedNFT | null>(null);
    const [treasuryBalance, setTreasuryBalance] = useState<number | undefined>(undefined);
    const [rewardsClaimStatus, setRewardsClaimStatus] = useState<boolean>(false);

    const updatedUserOwnedNFTs = (nfts: UserOwnedNFT[]) => {
        setUserOwnedNFTs(nfts);
    };

    const updateTreasuryBalance = async () => {
        try {
            const response: TreasuryBalanceResponse = await fetchTreasuryBalance();
            setTreasuryBalance(response.balance);
        } catch (error) {
            console.error("Error updating treasury balance:", error);
            setTreasuryBalance(undefined);
        }
    };

    const updateActiveNFT = (nftDetails: UserOwnedNFT | null) => {
        setActiveNFT(nftDetails);
    };

    const updateRewardsClaimPeriodStatus = async () => {
        try {
            const response = await fetchRewardsClaimingStatus();
            if (response) {
                setRewardsClaimStatus(response.status);
            }
        } catch (error) {
            console.error("Error updating treasury balance:", error);
        }
    };

    const contextValue: AppContextType = {
        userOwnedNFTs,
        updatedUserOwnedNFTs,
        treasuryBalance,
        updateTreasuryBalance,
        activeNFT,
        updateActiveNFT,
        rewardsClaimStatus,
        updateRewardsClaimPeriodStatus,
    };

    useEffect(() => {
        const updateOwnedNFTs = async (walletAddress: string) => {
            const nfts = await fetchUserOwnedNFTs(walletAddress);
            setUserOwnedNFTs(nfts);
            if (nfts.length > 0) {
                updateActiveNFT(nfts[0]);
            } else {
                updateActiveNFT(null);
            }
        };

        if (wallet?.address) {
            updateOwnedNFTs(wallet?.address);
        } else {
            setUserOwnedNFTs([]);
        }
    }, [wallet?.address]);

    useEffect(() => {
        updateTreasuryBalance();
        updateRewardsClaimPeriodStatus();
    }, []);

    return <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>;
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAppContext = () => {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error("useAppContext must be used within AppProvider");
    }
    return context;
};
