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
        <div className="auction-history w-full max-w-[1200px] mx-auto  my-8 p-4">
            <div className="name text-gray-500 md:text-2xl text-lg">EthenaDAO</div>
            <h3 className="name md:text-6xl text-3xl">Auction History</h3>
            {loading && (
                <div className="loading-state my-10">
                    <h1 className="name text-xl font-bold">Loading auction history...</h1>
                </div>
            )}
            <div className="mt-6">
                {!loading && historyData.length === 0 && <div>Nothing to display.</div>}

                <div className="auction-items flex flex-col gap-4">
                    {historyData?.length > 0 &&
                        historyData.map((auctionData) => (
                            <div className="auction-item flex bg-[rgba(255,255,255,0.4)] rounded-md gap-4 p-4 overflow-auto">
                                <div className="w-[100px] h-[100px] flex-shrink-0">
                                    <img
                                        src={auctionData.nftImage}
                                        alt={auctionData.title}
                                        className="w-full h-full object-contain bg-[rgba(255,255,255,0.5)] rounded-lg"
                                    />
                                </div>

                                <div>
                                    <div>{auctionData.title}</div>
                                    <div>{auctionData.description}</div>
                                    <div>NFT: {auctionData.nftName}</div>
                                    <div>NFT Description: {auctionData.nftDescription}</div>
                                    <div>
                                        NFT Id:{" "}
                                        <Link
                                            to={`${SUI_EXPLORER_URL}/object/${auctionData.nftId}`}
                                            target="_blank"
                                            className="underline"
                                        >
                                            {auctionData.nftId}
                                        </Link>
                                    </div>
                                    <div>Winner: {auctionData.highestBidder}</div>
                                    <div>Bidding Price: {auctionData.amount * 10 ** -9} SUI</div>
                                </div>
                            </div>
                        ))}
                </div>
            </div>
        </div>
    );
};

export default AuctionHistoryPage;
