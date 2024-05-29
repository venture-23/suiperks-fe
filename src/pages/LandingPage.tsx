import { useState } from "react";
import { Link } from "react-router-dom";
import { useWallet } from "@suiet/wallet-kit";

import DummyImg from "../assets/images/000000.jpg";
import DownArrow from "../assets/images/dropdown.png";
import UpArrow from "../assets/images/upload.png";

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
    ];

    const toggleDropdown = (index: number) => {
        setSelected(selected === index ? null : index);
    };

    return (
        <div className="w-[80vw] mx-auto">
            <div className="my-24 flex md:flex-row flex-col justify-between gap-10 items-center">
                <div className="md:text-left text-center">
                    <h1 className="name md:text-5xl text-3xl font-bold mb-6 text-[#1c0971]">Welcome to SUI Perks</h1>
                    <p className="md:text-xl text-base mb-8 max-w-2xl">
                        SUI Perks is a community-driven organization that operates transparently and autonomously on the
                        blockchain.
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
                <div>
                    <img src={DummyImg} />
                </div>
            </div>
            <div className="my-24">
                <h2 className="name md:text-4xl text-2xl font-bold mb-6 text-center text-[#1c0971]">
                    How SUI Perks works
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3">
                    <div className=" p-8 ">
                        <div className="flex items-center gap-3 mb-3">
                            <div className="w-[40px] h-[40px] bg-[#1c0971] border-[12px] border-solid border-[#1c0971] rounded-[50px] flex items-center justify-center text-[18px] font-medium">
                                <span className="text-white">1</span>
                            </div>
                            <div className="name text-2xl">Title</div>
                        </div>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                            labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
                            laboris nisi ut aliquip ex ea commodo consequat.
                        </p>
                    </div>
                    <div className="p-8 border border-[#1c0971] md:border-x-[#1c0971] md:border-y-transparent border-x-transparent">
                        <div className="flex items-center gap-3 mb-3">
                            <div className="w-[40px] h-[40px] bg-[#1c0971] border-[12px] border-solid border-[#1c0971] rounded-[50px] flex items-center justify-center text-[18px] font-medium">
                                <span className="text-white">2</span>
                            </div>
                            <div className="name text-2xl">Title</div>
                        </div>

                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                            labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
                            laboris nisi ut aliquip ex ea commodo consequat.
                        </p>
                    </div>
                    <div className=" p-8 ">
                        <div className="flex items-center gap-3 mb-3">
                            <div className="w-[40px] h-[40px] bg-[#1c0971] border-[12px] border-solid border-[#1c0971] rounded-[50px] flex items-center justify-center text-[18px] font-medium">
                                <span className="text-white">3</span>
                            </div>
                            <div className="name text-2xl">Title</div>
                        </div>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                            labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
                            laboris nisi ut aliquip ex ea commodo consequat.
                        </p>
                    </div>
                </div>
            </div>

            <div className="my-24 flex flex-col md:items-center items-stretch">
                <h2 className="name md:text-4xl text-2xl font-bold mb-6 text-center text-[#1c0971]">SUI Perks FAQs</h2>
                <div className="md:w-[555px] w-auto">
                    {faqItems.map((item, index) => (
                        <div key={index} className="py-4 border-b border-[#1c0971]">
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
        </div>
    );
};

export default LandingPage;
