import { FormEvent, useState } from "react";
import { createSettleBidTxb } from "../services/settleBidServices";
import { useWallet } from "@suiet/wallet-kit";

// Todo: Update according to BE response
type AuctionItem = {
    auctionInfoId: string;
};

const SettleBidPage = () => {
    const [nftName, setNftName] = useState("");
    const [nftDescription, setNftDescription] = useState("");
    const [nftImage, setNftImage] = useState("");
    const wallet = useWallet();

    const [auctionItemDetails, setAuctionItemDetails] = useState<AuctionItem>({
        auctionInfoId: "",
    });

    const clearInputs = () => {
        setNftName("");
        setNftDescription("");
        setNftImage("");
    };

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();

        try {
            if (!nftName || !nftDescription || !nftImage) throw new Error("Missing inputs.");

            console.log("nftName:", nftName);
            console.log("nftDescription:", nftDescription);
            console.log("nftImage:", nftImage);

            const txb = createSettleBidTxb(
                {
                    nftName: nftName,
                    nftDetails: nftDescription,
                    nftImageUrl: nftImage,
                },
                auctionItemDetails.auctionInfoId
            );
            const txnResponse = await wallet.signAndExecuteTransactionBlock({
                // @ts-expect-error transactionBlock type mismatch error between @suiet/wallet-kit and @mysten/sui.js
                transactionBlock: txb,
            });
            console.log("txnResponse", txnResponse);
            if (txnResponse?.digest) {
                console.log("Settle bid digest:", txnResponse?.digest);

                // Handle Success messages
                clearInputs();
            }
        } catch (err) {
            console.log(err);
            // Handle Failed messages
        }
    };

    return (
        <div>
            <div className="w-full max-w-[500px] bg-[rgba(255,255,255,0.3)] rounded-md m-auto p-4">
                <h3 className="font-semibold text-lg">Settle Bid</h3>

                <div className="mt-4">
                    <form onSubmit={handleSubmit}>
                        <div className="form-group flex flex-col mt-2">
                            <label htmlFor="nftName">NFT Name:</label>
                            <input
                                type="text"
                                id="nftName"
                                name="nftName"
                                value={nftName}
                                placeholder="Name"
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNftName(e.target.value)}
                                required
                                className="h-[40px] mt-1 p-1"
                            />
                        </div>
                        <div className="form-group flex flex-col mt-2">
                            <label htmlFor="nftDescription">NFT Description:</label>
                            <input
                                type="text"
                                id="nftDescription"
                                name="nftDescription"
                                value={nftDescription}
                                placeholder="Description"
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNftDescription(e.target.value)}
                                required
                                className="h-[40px] mt-1 p-1"
                            />
                        </div>
                        <div className="form-group flex flex-col mt-2">
                            <label htmlFor="nftImage">NFT Image:</label>
                            <input
                                type="nftImage"
                                id="nftImage"
                                name="nftImage"
                                value={nftImage}
                                placeholder="Image URL"
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNftImage(e.target.value)}
                                required
                                className="h-[40px] mt-1 p-1"
                            />
                        </div>
                        <div className="form-group mt-4">
                            <button type="submit" className="bg-gray-900 text-white px-4 py-2 rounded-md">
                                Submit
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default SettleBidPage;
