import { useWallet } from "@suiet/wallet-kit";

import NFTImage1 from "../../assets/images/nft dummy images/Pleased_Sulley.png";
import NFTImage2 from "../../assets/images/nft dummy images/bars.png";
import NFTImage3 from "../../assets/images/nft dummy images/images (2).png";
import NFTImage4 from "../../assets/images/nft dummy images/cover3.png";

const userNFTs = [
    {
        id: 1,
        name: "NFT 1",
        image: NFTImage1,
        description: "Description of NFT 1",
    },
    {
        id: 2,
        name: "NFT 2",
        image: NFTImage2,
        description: "Description of NFT 2",
    },
    {
        id: 3,
        name: "NFT 3",
        image: NFTImage3,
        description: "Description of NFT 3",
    },
    {
        id: 4,
        name: "NFT 4",
        image: NFTImage4,
        description: "Description of NFT 4",
    },
];

const UserDashboard = () => {
    const wallet = useWallet();

    const formatWalletAddress = (address: string | undefined) => {
        if (!address) return "";
        const start = address.substring(0, 5);
        const end = address.substring(address.length - 4);
        return `${start}...${end}`;
    };

    return (
        <div className="md:mx-40 my-10 mx-4">
            <div className="flex md:justify-between md:flex-row flex-col my-4 ">
                <div>
                    <div className="name text-gray-500 md:text-2xl text-lg">Crowdfund DAO</div>
                    <div className="name md:text-6xl text-2xl">Owned NFTs</div>
                </div>
                <div className="flex items-center">
                    <span className="font-bold">Wallet Address:&nbsp; </span>
                    <span className="underline" title={wallet?.address}>
                        {formatWalletAddress(wallet?.address)}
                    </span>
                </div>
            </div>

            <div className="flex flex-wrap justify-center">
                {userNFTs.map((nft) => (
                    <div key={nft.id} className="bg-white rounded-lg shadow-md p-4 m-2" style={{ width: "300px" }}>
                        <div className="w-full h-60 overflow-hidden">
                            <img src={nft.image} alt={nft.name} className="w-full h-auto" />
                        </div>
                        <div className="p-3">
                            <h2 className="text-2xl font-bold">{nft.name}</h2>
                            <p className="text-gray-800">{nft.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default UserDashboard;
