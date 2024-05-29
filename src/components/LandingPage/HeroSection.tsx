import { Link } from "react-router-dom";

import Logo from "../../assets/images/Logo.png";
import { useWallet } from "@suiet/wallet-kit";

const Hero = () => {
    const wallet = useWallet();

    return (
        <div className="my-24 flex md:flex-row flex-col justify-between gap-10 items-center">
            <div className="md:text-left text-center">
                <h1 className="name md:text-5xl text-3xl font-bold mb-6 text-[#1c0971]">Welcome to SUI Perks</h1>
                <p className="md:text-xl text-base font-semibold mb-8 max-w-2xl">Daily Perks for a Lifetime</p>
                <p className="md:text-xl text-base mb-8 max-w-2xl">
                    Welcome to SUIPerks, where NFTs meet purpose! SUIPerks is a community-driven platform transforming
                    fundraising and collaboration. By minting unique NFTs daily, we ensure fairness and trust. From
                    supporting personal projects and charitable initiatives to owning sports clubs, SUIPerks empowers
                    everyone to make a difference and have a voice in every decision.
                </p>
                {wallet.connected ? (
                    ""
                ) : (
                    <p className="md:text-base text-sm my-4 text-red-400">Connect wallet to place bid</p>
                )}
                <Link
                    to="/auction"
                    className={`py-3 px-4 rounded ${wallet.connected ? "bg-[#1c0971] hover:bg-blue-700 text-white" : "bg-gray-200 text-gray-400 cursor-not-allowed"}`}
                    onClick={(e) => !wallet.connected && e.preventDefault()}
                >
                    Place a Bid
                </Link>
            </div>
            <div className="h-[400px] w-[400px]">
                <img src={Logo} />
            </div>
        </div>
    );
};
export default Hero;
