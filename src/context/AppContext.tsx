import React, { createContext, useState, useContext, ReactNode, useEffect } from "react";
import { UserOwnedNFT, fetchUserOwnedNFTs } from "../services/userServices";
import { useWallet } from "@suiet/wallet-kit";

interface AppContextType {
    userOwnedNFTs: UserOwnedNFT[];
    updatedUserOwnedNFTs: (nfts: UserOwnedNFT[]) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

interface AppProviderProps {
    children: ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
    const wallet = useWallet();
    const [userOwnedNFTs, setUserOwnedNFTs] = useState<UserOwnedNFT[]>([]);
    const updatedUserOwnedNFTs = (nfts: UserOwnedNFT[]) => {
        setUserOwnedNFTs(nfts);
    };

    const contextValue: AppContextType = {
        userOwnedNFTs,
        updatedUserOwnedNFTs,
    };

    useEffect(() => {
        const updateOwnedNFTs = async (walletAddress: string) => {
            const nfts = await fetchUserOwnedNFTs(walletAddress);
            setUserOwnedNFTs(nfts);
        };

        if (wallet?.address) {
            updateOwnedNFTs(wallet?.address);
        } else {
            setUserOwnedNFTs([]);
        }
    }, [wallet?.address]);

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
