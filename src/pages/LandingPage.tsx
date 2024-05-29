import { useState } from "react";
import { Link } from "react-router-dom";
import { useWallet } from "@suiet/wallet-kit";

import Logo from "../assets/images/Logo.png";
import DownArrow from "../assets/images/dropdown.png";
import UpArrow from "../assets/images/upload.png";
import AuctionImg from "../assets/images/auction.png";
import ContributeImg from "../assets/images/contribute.png";
import EarnImg from "../assets/images/earnReward.png";
import Footer from "../components/Footer";

interface FAQItem {
    question: string;
    answer?: React.ReactNode;
}

const LandingPage = () => {
    const wallet = useWallet();
    const [selected, setSelected] = useState<number | null>(null);

    const faqItems: FAQItem[] = [
        {
            question: "What is SUI Perks?",
            answer: "SUI Perks is a ",
        },
        {
            question: "What is SUI Perks?",
            answer: "SUI Perks is a ",
        },
    ];

    const toggleDropdown = (index: number) => {
        setSelected(selected === index ? null : index);
    };

    return (
        <>
            <div className="container mx-auto">
                <div className="my-24 flex md:flex-row flex-col justify-between gap-10 items-center">
                    <div className="md:text-left text-center">
                        <h1 className="name md:text-5xl text-3xl font-bold mb-6 text-[#1c0971]">
                            Welcome to SUI Perks
                        </h1>
                        <p className="md:text-xl text-base font-semibold mb-8 max-w-2xl">Daily Perks for a Lifetime</p>
                        <p className="md:text-xl text-base mb-8 max-w-2xl">
                            Welcome to SUIPerks, where NFTs meet purpose! SUIPerks is a community-driven platform
                            transforming fundraising and collaboration. By minting unique NFTs daily, we ensure fairness
                            and trust. From supporting personal projects and charitable initiatives to owning sports
                            clubs, SUIPerks empowers everyone to make a difference and have a voice in every decision.
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
                <div className="my-24">
                    <div className="flex md:flex-row flex-col gap-3 ">
                        <div className="relative mx-auto mt-12 w-[384px] h-[235px] border border-gray-300 text-center bg-[#D9D9D9] rounded-[15px] flex flex-col items-center justify-center">
                            <div className="absolute inset-x-0 top-0 flex justify-center -translate-y-1/2">
                                <div className="md:w-[90px] md:h-[90px] w-[60px] h-[60px] bg-[#58B1BD] border-[12px] border-solid border-[#58B1BD] rounded-[50px] flex items-center justify-center text-[18px] font-medium">
                                    <img src={AuctionImg} />
                                </div>
                            </div>
                            <div className="pt-8 ">
                                <div className="name md:text-[32px] text-xl mb-3">Perks NFT</div>
                                <p className="font-semibold text-base max-w-[331px]">
                                    Represents the daily minting of unique NFTs available for bidding.
                                </p>
                            </div>
                        </div>
                        <div className="relative mx-auto mt-12 w-[384px] h-[235px] border border-gray-300 text-center bg-[#D9D9D9] rounded-[15px] flex flex-col items-center justify-center">
                            <div className="absolute inset-x-0 top-0 flex justify-center -translate-y-1/2">
                                <div className="md:w-[90px] md:h-[90px] w-[60px] h-[60px] bg-[#58B1BD] border-[12px] border-solid border-[#58B1BD] rounded-[50px] flex items-center justify-center text-[18px] font-medium">
                                    <img src={ContributeImg} />
                                </div>
                            </div>
                            <div className="pt-8 ">
                                <div className="name md:text-[32px] text-xl mb-3">Community Treasury</div>
                                <p className="font-semibold text-base max-w-[331px]">
                                    Symbolizes the community-controlled treasury where funds are allocated and managed
                                    democratically.
                                </p>
                            </div>
                        </div>
                        <div className="relative mx-auto mt-12 w-[384px] h-[235px] border border-gray-300 text-center bg-[#D9D9D9] rounded-[15px] flex flex-col items-center justify-center">
                            <div className="absolute inset-x-0 top-0 flex justify-center -translate-y-1/2">
                                <div className="md:w-[90px] md:h-[90px] w-[60px] h-[60px] bg-[#58B1BD] border-[12px] border-solid border-[#58B1BD] rounded-[50px] flex items-center justify-center text-[18px] font-medium">
                                    <img src={EarnImg} />
                                </div>
                            </div>
                            <div className="pt-8 ">
                                <div className="name md:text-[32px] text-xl mb-3">Equality and Empowerment</div>
                                <p className="font-semibold md:text-base text-sm max-w-[331px]">
                                    Represents the principle of equality and symbolizes the power of each member's vote
                                    and voice in decision-making.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="my-24 flex flex-col md:items-center items-stretch">
                    <h2 className="name md:text-4xl text-2xl font-bold mb-6 text-center text-[#1c0971]">FAQs</h2>
                    <div className="md:w-[555px] w-auto">
                        {faqItems.map((item, index) => (
                            <div key={index} className="py-4 border border-[#000000] rounded-[25px] px-3 mb-2">
                                <div
                                    className="flex items-center justify-between cursor-pointer"
                                    onClick={() => toggleDropdown(index)}
                                >
                                    <div
                                        className={`font-bold text-lg py-3 ${
                                            selected === index ? "text-[#1c0971]" : "text-black"
                                        }`}
                                    >
                                        {item.question}
                                    </div>
                                    <img
                                        src={selected === index ? UpArrow : DownArrow}
                                        alt="Dropdown Icon"
                                        className="w-4"
                                    />
                                </div>
                                <div
                                    className={`overflow-hidden transition-all duration-500 ${
                                        selected === index ? "max-h-[200px]" : "max-h-0"
                                    }`}
                                >
                                    <div className="font-medium text-lg max-w-[480px] pt-4">{item.answer}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="container mx-auto mt-28 mb-16 relative">
                    <div className="bg-[#D9D9D9] my-12 w-full rounded-[44px] flex lg:flex-row flex-col items-center lg:gap-24 gap-4 relative overflow-hidden px-4">
                        <div className="details lg:ml-20 ml-4 lg:py-20 py-6">
                            <div className=" max-w-[658px] ">
                                <p className="md:text-[36px] text-3xl font-semibold text-black">
                                    Join us in transforming the future of NFTs and crowdfunding{" "}
                                </p>
                            </div>
                        </div>
                        <div className="email mb-4 lg:mb-0">
                            <div className="rounded-[35px] bg-white flex">
                                <input
                                    className=" max-w-[340px] bg-transparent py-4 px-8 rounded-[35px] border-y border-transparent focus:outline-none"
                                    placeholder="Email Address"
                                />
                                <button className="rounded-[27px] px-6 bg-[#058CF8] hover:bg-[#6eb9f7] text-white text-base font-extrabold xl:w-[160px] lg:w-[140px] md:w-[100px] w-[80px] h-[55px] m-2">
                                    Join
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default LandingPage;
