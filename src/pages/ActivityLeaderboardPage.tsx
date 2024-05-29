import { useEffect, useState } from "react";
import {
    LeaderboardItem,
    createClaimRewardTxb,
    fetchAccumulatedPointsLeaderboard,
    fetchUserPoints,
} from "../services/rewardsServices";
import { toast } from "react-toastify";
import { useWallet } from "@suiet/wallet-kit";
import { useAppContext } from "../context/AppContext";

const ActivityLeaderboard = () => {
    const wallet = useWallet();
    const { rewardsClaimStatus } = useAppContext();
    const [data, setData] = useState<LeaderboardItem[]>([]);
    const [loading, setLoading] = useState(false);
    const [points, setPoints] = useState<number>(0);

    const getUserPoints = async (walletAddress: string) => {
        try {
            const userPoints = await fetchUserPoints(walletAddress);
            if (userPoints && userPoints?.gain >= 0) {
                const pointsInSui = userPoints.gain;
                setPoints(pointsInSui);
            }
        } catch (error) {
            console.error("Error fetching points", error);
        }
    };

    const handleClaim = async () => {
        if (!wallet.address) return;

        try {
            const txb = createClaimRewardTxb(wallet.address);
            const txnResponse = await wallet.signAndExecuteTransactionBlock({
                // @ts-expect-error transactionBlock type mismatch error between @suiet/wallet-kit and @mysten/sui.js
                transactionBlock: txb,
            });
            console.log("txnResponse", txnResponse);
            if (txnResponse?.digest) {
                toast.success("Rewards Claim Success.");
                getUserPoints(wallet.address);
            }
        } catch (error) {
            console.error("Error placing bid:", error);
            toast.error("Rewards Claim Failed.");
        }
    };

    useEffect(() => {
        (async () => {
            setLoading(true);
            const res = await fetchAccumulatedPointsLeaderboard();
            if (res) {
                console.log(res);
                setData(res);
            }
            setLoading(false);
        })();
    }, []);

    useEffect(() => {
        if (wallet.address) {
            getUserPoints(wallet.address);
        }
    }, [wallet.address]);

    return (
        <div className="dashboard w-full max-w-[1200px] my-8 mx-auto p-4">
            <div className="name text-gray-500 md:text-2xl text-lg">SUI Perks</div>
            <div className="name md:text-6xl text-3xl text-[#1c0971]">Leaderboard</div>

            <div className="mt-8">
                <div className="flex gap-10 items-center my-4">
                    <div>
                        <div className="md:text-xl text-lg font-semibold">Accumulated Points: {points}</div>
                        <div className="">You have no points yet. Please participate in activities to earn points.</div>
                    </div>
                    {rewardsClaimStatus && points > 0 && (
                        <button
                            className="px-4 py-4 bg-blue-700 hover:bg-blue-500 text-white rounded-md"
                            onClick={handleClaim}
                        >
                            Claim
                        </button>
                    )}
                </div>
            </div>

            <div className="flex flex-col gap-10 items-center my-8">
                {loading && <h1 className="text-lg font-semibold">Loading leaderboard...</h1>}
                {!loading && data.length === 0 && <div className="text-lg font-semibold">Nothing to display.</div>}{" "}
                <div className="overflow-x-auto w-full">
                    <table className="w-full text-left table-auto border-collapse">
                        <thead className="bg-[#1c0971]">
                            <tr>
                                <th className="px-4 py-3 font-medium text-white">Rank</th>
                                <th className="px-4 py-3 font-medium text-white">Wallet Address</th>
                                <th className="px-4 py-3 font-medium text-white">Points</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data?.length > 0 &&
                                data.map((leaderboardItem, index) => (
                                    <tr
                                        className="border-b border-gray-200 dark:border-gray-700"
                                        style={{
                                            background:
                                                leaderboardItem.walletAddress === wallet.address
                                                    ? "rgba(0, 0, 0, 0.2)"
                                                    : "",
                                        }}
                                        key={index}
                                    >
                                        <td className="px-4 py-3 font-medium">{index + 1}</td>
                                        <td className="px-4 py-3">{leaderboardItem.walletAddress}</td>
                                        <td className="px-4 py-3 font-bold">{leaderboardItem.gain}</td>
                                    </tr>
                                ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default ActivityLeaderboard;
