import { useEffect, useState } from "react";
import { NftDetails, getNftDetails } from "../services/auctionHistoryServices";
import { Link, useParams } from "react-router-dom";

const SUI_EXPLORER_URL = "https://suiscan.xyz/testnet";

const NftHistoryPage = () => {
    const { NftId } = useParams<{ NftId?: string }>() ?? { NftId: "" };
    const [nftDetails, setNftDetails] = useState<NftDetails | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    console.log("nftid", NftId);

    const fetchNft = async () => {
        if (NftId) {
            try {
                const details = await getNftDetails(NftId);
                setNftDetails(details);
            } catch (err) {
                console.log(err);
            } finally {
                setLoading(false);
            }
        } else {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchNft();
    }, [NftId]);

    if (loading)
        return (
            <div className="flex md:flex-row flex-col items-center justify-center gap-10 w-[80vw] mx-auto mt-10">
                <div className="text-2xl font-bold text-[#1c0971]">Loading...</div>
            </div>
        );

    if (!nftDetails)
        return (
            <div className="flex md:flex-row flex-col items-center justify-center gap-10 w-[80vw] mx-auto mt-10">
                <div className="text-2xl font-bold text-[#1c0971]">No details available</div>
            </div>
        );

    return (
        <div className="flex md:flex-row flex-col items-center justify-center gap-10 w-[80vw] mx-auto mt-10">
            <div className="image flex justify-center w-[300px] h-[300px] bg-[rgba(255,255,255,0.5)] rounded-xl p-1">
                <img className="w-full h-full object-contain" src={nftDetails.nftImage} alt={nftDetails.nftName} />
            </div>
            <div>
                <h1 className="name mb-3 md:text-4xl text-2xl ">{nftDetails.nftName}</h1>
                <p className="mb-8 md:text-lg text-sm border-b border-gray-700">{nftDetails.nftDescription}</p>
                <p className="text-gray-700 mb-4">
                    Owner:{" "}
                    <Link
                        to={`${SUI_EXPLORER_URL}/account/${nftDetails.nftOwner}`}
                        target="_blank"
                        className="underline"
                    >
                        {nftDetails.nftOwner.slice(0, 6)}...{nftDetails.nftOwner.slice(-6)}
                    </Link>
                </p>
                {nftDetails.activity.length === 0 ? (
                    <p className="text-gray-500">No activity recorded.</p>
                ) : (
                    <ul>
                        {nftDetails.activity.map((activity) => (
                            <li
                                key={activity._id}
                                className="bg-gray-100 p-4 rounded-lg shadow-md flex flex-col gap-1 mb-2"
                            >
                                <p className="text-gray-700">
                                    <span className="font-semibold">Type:</span> {activity.type}
                                </p>
                                <p className="text-gray-700">
                                    <span className="font-semibold">Transaction Digest:</span>{" "}
                                    <Link
                                        to={`${SUI_EXPLORER_URL}/object/${activity.txDigest}`}
                                        target="_blank"
                                        className="underline"
                                    >
                                        {activity.txDigest.slice(0, 6)}...{activity.txDigest.slice(-6)}
                                    </Link>
                                </p>
                                <p className="text-gray-700">
                                    <span className="font-semibold">Sender: </span>
                                    <Link
                                        to={`${SUI_EXPLORER_URL}/account/${activity.sender}`}
                                        target="_blank"
                                        className="underline"
                                    >
                                        {activity.sender.slice(0, 6)}...{activity.sender.slice(-6)}
                                    </Link>
                                </p>
                                <p className="text-gray-700">
                                    <span className="font-semibold">NFT ID:</span>{" "}
                                    <Link
                                        to={`${SUI_EXPLORER_URL}/object/${activity.sender}`}
                                        target="_blank"
                                        className="underline"
                                    >
                                        {activity.nftId.slice(0, 6)}...{activity.nftId.slice(-6)}
                                    </Link>
                                </p>

                                <p className="text-gray-500">
                                    <span className="font-semibold">Created At:</span>{" "}
                                    {new Date(activity.createdAt).toLocaleString()}
                                </p>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default NftHistoryPage;
