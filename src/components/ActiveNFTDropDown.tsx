import { useAppContext } from "../context/AppContext";
import { UserOwnedNFT } from "../services/userServices";

const ActiveNFTDropDown = () => {
    const { userOwnedNFTs, activeNFT, updateActiveNFT } = useAppContext();

    const handleSelectOption = (nft: UserOwnedNFT) => {
        updateActiveNFT(nft);
    };

    return (
        <div className="nft-drop-down group relative w-[200px]">
            <div className="bg-[rgba(235,235,235,0.8)] px-4 py-2 rounded-lg font-semibold cursor-pointer h-[48px] flex justify-center items-center">
                {activeNFT ? (
                    <div>
                        <div className="flex items-center gap-2">
                            <div className="w-[32px] h-[32px] bg-[rgba(255,255,255,0.5)] rounded">
                                <img
                                    src={activeNFT.nftImage}
                                    alt={activeNFT.nftId}
                                    className="w-full h-full object-contain"
                                />
                            </div>
                            <div>
                                <div className="text-[10px] text-right">Active NFT</div>
                                <div className="text-md">
                                    {activeNFT.nftId.slice(0, 6)}...{activeNFT.nftId.slice(-6)}
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div>No Owned NFT</div>
                )}
            </div>

            <div className="pt-2 hidden group-hover:block absolute right-0">
                <div className="bg-[rgba(235,235,235,0.8)] rounded-lg px-2 py-2">
                    <div className="text-xs text-gray-500">Select your active NFT</div>

                    <div className="flex flex-col gap-2">
                        {userOwnedNFTs.map((nft, index) => (
                            <div
                                className="flex gap-2 cursor-pointer rounded-lg p-2 hover:bg-[rgba(255,255,255,0.3)]"
                                key={index}
                                onClick={() => handleSelectOption(nft)}
                            >
                                <div className="w-[64px] h-[64px] bg-[rgba(255,255,255,0.5)] rounded">
                                    <img src={nft.nftImage} alt={nft.nftId} className="w-full h-full object-contain" />
                                </div>
                                <div>
                                    <div className="text-sm">
                                        {nft.nftId.slice(0, 6)}...{nft.nftId.slice(-6)}
                                    </div>
                                    <div>{nft.nftName}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ActiveNFTDropDown;
