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
import { Link } from "react-router-dom";

const SUI_EXPLORER_URL = "https://suiscan.xyz/testnet";

const ActivityLeaderboard = () => {
    const wallet = useWallet();
    const { rewardsClaimStatus, activeNFT } = useAppContext();
    const [data, setData] = useState<LeaderboardItem[]>([]);
    const [loading, setLoading] = useState(false);
    const [points, setPoints] = useState<number>(0);
    const [claimed, setClaimed] = useState<boolean>(false);

    const getUserPoints = async (walletAddress: string) => {
        try {
            const userPoints = await fetchUserPoints(walletAddress);
            if (userPoints && userPoints?.gain >= 0) {
                const pointsInSui = userPoints.gain;
                setPoints(pointsInSui);
                setClaimed(userPoints.claimable === 0 ? true : false);
            }
        } catch (error) {
            console.error("Error fetching points", error);
        }
    };

    const handleClaim = async () => {
        try {
            if (!activeNFT?.nftId) throw new Error("No Active NFT.");

            const txb = createClaimRewardTxb(activeNFT?.nftId);
            const txnResponse = await wallet.signAndExecuteTransactionBlock({
                // @ts-expect-error transactionBlock type mismatch error between @suiet/wallet-kit and @mysten/sui.js
                transactionBlock: txb,
            });
            console.log("txnResponse", txnResponse);
            if (txnResponse?.digest) {
                toast.success("Rewards Claim Success.");
                getUserPoints(wallet.address as string);
                setClaimed(true);
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
                        {points === 0 && (
                            <div>You have no points yet. Please participate in activities to earn rewards.</div>
                        )}
                        {claimed && <div>You have already claimed your rewards for this session.</div>}
                    </div>
                    {rewardsClaimStatus && points > 0 && !claimed && (
                        <button
                            className="w-[100px] bg-blue-700 hover:bg-blue-500 text-white rounded-md px-4 py-2"
                            onClick={handleClaim}
                            disabled={claimed}
                        >
                            Claim
                        </button>
                    )}
                </div>
            </div>

            <div className="flex flex-col gap-10 items-center my-8">
                {loading && <h1 className="text-lg font-semibold">Loading leaderboard...</h1>}
                {!loading && data.length === 0 && <div className="text-lg font-semibold">Nothing to display.</div>}{" "}
                {data.length > 0 && (
                    <div className="overflow-x-auto w-full">
                        <table className="w-full text-left table-auto border-collapse">
                            <thead className="bg-[#1c0971]">
                                <tr>
                                    <th className="px-4 py-3 font-medium text-white">Rank</th>
                                    <th className="px-4 py-3 font-medium text-white">Wallet Address</th>
                                    <th className="px-4 py-3 font-medium text-white">Current Points</th>
                                    <th className="px-4 py-3 font-medium text-white">Overall Points</th>
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
                                            <td className="px-4 py-3">
                                                <Link
                                                    to={`${SUI_EXPLORER_URL}/account/${leaderboardItem.walletAddress}`}
                                                    target="_blank"
                                                    className="underline"
                                                >
                                                    {leaderboardItem.walletAddress}
                                                </Link>
                                            </td>
                                            <td className="px-4 py-3 font-bold">{leaderboardItem.gain}</td>
                                            <td className="px-4 py-3 font-bold">{leaderboardItem.point}</td>
                                        </tr>
                                    ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ActivityLeaderboard;
