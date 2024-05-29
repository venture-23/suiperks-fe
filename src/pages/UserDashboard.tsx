import { useWallet } from "@suiet/wallet-kit";
import { useAppContext } from "../context/AppContext";
import { useEffect, useState } from "react";
import { fetchUserPoints } from "../services/userServices";

const UserDashboard = () => {
    const { userOwnedNFTs } = useAppContext();
    const [points, setPoints] = useState<number>(0);
    const [hasPoints, setHasPoints] = useState(true);

    const wallet = useWallet();
    const walletAddress = wallet.address as string;

    useEffect(() => {
        const getUserPoints = async () => {
            try {
                if (walletAddress) {
                    const userPoints = await fetchUserPoints(walletAddress);
                    setPoints(userPoints);
                    if (userPoints) {
                        setHasPoints(true);
                    } else {
                        console.log("No points");
                        setHasPoints(false);
                    }
                }
            } catch (error) {
                console.error("Error fetching points", error);
                setHasPoints(false);
            }
        };
        getUserPoints();
    }, [walletAddress]);

    return (
        <div className="dashboard w-full max-w-[1200px] my-8 mx-auto p-4">
            <div className="name text-gray-500 md:text-2xl text-lg">SUI Perks</div>
            <div className="name md:text-6xl text-3xl text-[#1c0971]">Owned NFTs</div>
            <div className="flex gap-10 items-center my-4">
                {hasPoints ? (
                    <>
                        <div className="md:text-xl text-lg font-semibold">Accumulated Points: {points}</div>
                        <button className="px-4 py-4 bg-blue-700 hover:bg-blue-500 text-white rounded-md">Claim</button>
                    </>
                ) : (
                    <div className="flex flex-col">
                        <div className="font-semibold md:text-xl text-lg">Accumulated Points: {points}</div>
                        <div className="">You have no points yet. To accumulate points....</div>
                    </div>
                )}
            </div>

            <div className="mt-8">
                {userOwnedNFTs.length === 0 && <div className="text-lg font-semibold">No owned items.</div>}

                <div className="flex">
                    {userOwnedNFTs.map((nft) => (
                        <div
                            key={nft.nftId}
                            className="bg-white rounded-lg shadow-md p-4 m-2"
                            style={{ width: "300px" }}
                        >
                            <div className="w-full h-[240px] overflow-hidden">
                                <img src={nft.nftImage} alt={nft.nftName} className="w-full h-full object-contain" />
                            </div>
                            <div className="p-3">
                                <h2 className="md:text-2xl text-xl font-bold">{nft.nftName}</h2>
                                <p className="text-gray-800">{nft.nftDescription}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default UserDashboard;
