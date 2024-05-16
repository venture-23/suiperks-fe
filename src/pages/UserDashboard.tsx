import { useEffect, useState } from "react";

const UserDashboard = () => {
    const [userNFTs, setUserNFTs] = useState<any[]>([]);

    useEffect(() => {
        const staticResponse = {
            ownedNFT: [
                {
                    _id: "6639c2a9381262788fee0956",
                    nftImage: "https://goblinsuinft.web.app/assets/img/goblin5.png",
                    nftName: "Goblin",
                    nftDescription: "Goblin description",
                },
                {
                    _id: "6639cbfdb30b17d047c2289e",
                    nftImage: "https://goblinsuinft.web.app/assets/img/goblin5.png",
                    nftName: "Goblin",
                    nftDescription: "Goblin description",
                },
            ],
        };
        setUserNFTs(staticResponse.ownedNFT);
    }, []);

    return (
        <div className="md:mx-40 my-10 mx-4">
            <div className="my-4">
                <div className="name text-gray-500 md:text-2xl text-lg">EthenaDAO</div>
                <div className="name md:text-5xl text-2xl">Owned NFTs</div>
            </div>

            <div className="flex flex-wrap justify-center">
                {userNFTs.map((nft) => (
                    <div key={nft._id} className="bg-white rounded-lg shadow-md p-4 m-2" style={{ width: "300px" }}>
                        <div className="w-full md:h-60 h-52 overflow-hidden">
                            <img src={nft.nftImage} alt={nft.nftName} className="w-full h-auto" />
                        </div>
                        <div className="p-3">
                            <h2 className="md:text-2xl text-xl font-bold">{nft.nftName}</h2>
                            <p className="text-gray-800">{nft.nftDescription}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default UserDashboard;
