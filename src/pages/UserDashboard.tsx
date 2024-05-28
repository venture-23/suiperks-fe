import { useAppContext } from "../context/AppContext";

const UserDashboard = () => {
    const { userOwnedNFTs } = useAppContext();

    return (
        <div className="dashboard w-full max-w-[1200px] my-8 mx-auto p-4">
            <div className="name text-gray-500 md:text-2xl text-lg">SUI Perks</div>
            <div className="name md:text-6xl text-3xl">Owned NFTs</div>

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
