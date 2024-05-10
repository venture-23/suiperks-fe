import { useEffect, useState } from "react";
import { AuctionDetails, getAuctionHistory } from "../../services/auctionHistoryServices";

const AuctionHistoryPage = () => {
    const [historyData, setHistoryData] = useState<AuctionDetails[]>([
        {
            _id: "6639c2a9381262788fee0956",
            nftImage: "https://goblinsuinft.web.app/assets/img/goblin5.png",
            nftName: "Goblin",
            nftDescription: "Goblin description",
            title: "Auction Day 1",
            description: "Auction Day 1 description",
            amount: 147745543,
            highestBidder: "0x821febff0631744c231a0f696f62b72576f2634b2ade78c74ff20f1df97fc9bf",
        },
    ]);
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
        <div className="auction-history max-w-[1200px] m-auto my-8 p-4">
            <h3 className="text-4xl font-bold">Auction History</h3>

            <div className="mt-6">
                {loading && <div>Loading...</div>}
                {!loading && historyData.length === 0 && <div>Nothing to display.</div>}

                <div className="auction-items flex flex-col gap-4">
                    {historyData?.length > 0 &&
                        historyData.map((auctionData) => (
                            <div className="auction-item flex bg-[rgba(255,255,255,0.4)] rounded-md gap-4 p-4 overflow-auto">
                                <div className="w-[100px] h-[100px] flex-shrink-0">
                                    <img src={auctionData.nftImage} alt={auctionData.title} className="w-full h-full" />
                                </div>

                                <div>
                                    <div>{auctionData.title}</div>
                                    <div>{auctionData.description}</div>
                                    <div>NFT: {auctionData.nftName}</div>
                                    <div>NFT Description: {auctionData.nftDescription}</div>
                                    <div>Winner: {auctionData.highestBidder}</div>
                                    <div>Bidding Price: {auctionData.amount}</div>
                                </div>
                            </div>
                        ))}
                </div>
            </div>
        </div>
    );
};

export default AuctionHistoryPage;