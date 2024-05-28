import { useEffect, useState } from "react";
import { AuctionDetails, getAuctionHistory } from "../services/auctionHistoryServices";
import { Link } from "react-router-dom";

const SUI_EXPLORER_URL = "https://suiscan.xyz/testnet";

const AuctionHistoryPage = () => {
    const [historyData, setHistoryData] = useState<AuctionDetails[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const getHistory = async () => {
            try {
                setLoading(true);
                const res = await getAuctionHistory();
                if (res && res?.length > 0) {
                    setHistoryData(res);
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setLoading(false);
            }
        };

        getHistory();
    }, []);

    return (
        <div className="auction-history w-full max-w-[1200px] mx-auto my-8 p-4">
            <div className="name text-gray-500 md:text-2xl text-lg">SUI Perks</div>
            <h3 className="name md:text-6xl text-3xl">Auction History</h3>

            <div className="mt-8">
                {loading && <h1 className="text-lg font-semibold">Loading auction history...</h1>}
                {!loading && historyData.length === 0 && (
                    <div className="text-lg font-semibold">Nothing to display.</div>
                )}{" "}
                <div className="flex flex-col items-center gap-6">
                    {historyData?.length > 0 &&
                        historyData.map((auctionData) => (
                            <div className="box-shadow max-w-[800px] w-full mx-auto md:mx-0 flex md:flex-row flex-col items-start rounded-md gap-4 p-4 overflow-auto">
                                <div className="w-[100px] h-[100px] flex-shrink-0">
                                    <img
                                        src={auctionData.nftImage}
                                        alt={auctionData.title}
                                        className="w-full h-full object-contain bg-[rgba(255,255,255,0.5)] rounded-lg"
                                    />
                                </div>

                                <div className="flex flex-col gap-1">
                                    <div className="text-xl text-gray-500 font-bold">{auctionData.title}</div>
                                    <div className=" text-sm">{auctionData.description}</div>
                                    <div>
                                        NFT:&nbsp;
                                        <span className="name my-2 md:text-2xl text-lg font-bold">
                                            {auctionData.nftName}
                                        </span>
                                    </div>
                                    <div className="md:text-lg text-sm">
                                        NFT Description: {auctionData.nftDescription}
                                    </div>
                                    <div>
                                        NFT Id:{" "}
                                        <Link
                                            to={`${SUI_EXPLORER_URL}/object/${auctionData.nftId}`}
                                            target="_blank"
                                            className="underline"
                                        >
                                            {auctionData.nftId.slice(0, 6)}...{auctionData.nftId.slice(-6)}
                                        </Link>
                                    </div>
                                    <div>
                                        Winner:{" "}
                                        <Link
                                            to={`${SUI_EXPLORER_URL}/account/${auctionData.highestBidder}`}
                                            target="_blank"
                                            className="underline"
                                        >
                                            {" "}
                                            {auctionData?.highestBidder?.slice(0, 6)}...
                                            {auctionData?.highestBidder?.slice(-6)}
                                        </Link>
                                    </div>
                                    <div className="text-xl">
                                        Bidding Price:{" "}
                                        <span className="font-bold">{auctionData.amount * 10 ** -9} SUI</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                </div>
            </div>
        </div>
    );
};

export default AuctionHistoryPage;
