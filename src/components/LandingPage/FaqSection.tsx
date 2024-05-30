import { useState } from "react";
import DownArrow from "../../assets/images/dropdown.png";
import UpArrow from "../../assets/images/upload.png";

interface FAQItem {
    question: string;
    answer?: React.ReactNode;
}

const FaqSection = () => {
    const [selected, setSelected] = useState<number | null>(null);

    const faqItems: FAQItem[] = [
        {
            question: "What is SUIPerks?",
            answer: "SUIPerks is a platform that transforms NFTs into valuable investments and establishes a community-controlled treasury. It uses NFTs as gateway passes, enabling decentralized crowdfunding and democratic governance.",
        },
        {
            question: "How does the daily NFT minting process work?",
            answer: " Each day, SUIPerks mints a single NFT available for public bidding. This approach ensures fairness and prevents pump-and-dump schemes, with the highest bid amount allocated to the community treasury.",
        },
        {
            question: "What benefits do NFT holders get?",
            answer: "NFT holders gain exclusive rights to vote on proposals, submit their own ideas, and shape the platform's direction. This democratizes the decision-making process and ensures community involvement.",
        },
        {
            question: "How does SUIPerks support charitable initiatives?",
            answer: " SUIPerks extends beyond supporting builders to include charitable initiatives such as aiding disease victims, disaster relief, and women's development programs. The community treasury can also fund and own sports clubs and other projects.",
        },
        {
            question: " How does SUIPerks ensure transparency and security?",
            answer: "   As one of the first DAOs on SUI, SUIPerks offers unparalleled transparency, with all user activities visible to everyone. Your identity is securely linked to your wallet address and NFTs, adding an extra layer of trust and accountability.",
        },
    ];

    const toggleDropdown = (index: number) => {
        setSelected(selected === index ? null : index);
    };
    return (
        <div className="my-24 flex flex-col md:items-center items-stretch">
            <h2 className="name md:text-4xl text-2xl font-bold mb-6 text-center text-[#1c0971]">FAQs</h2>
            <div className="md:w-[555px] w-auto">
                {faqItems.map((item, index) => (
                    <div key={index} className="py-4 px-3 mb-2 border-b border-[#1c0971] ">
                        <div
                            className="flex items-center justify-between cursor-pointer "
                            onClick={() => toggleDropdown(index)}
                        >
                            <div
                                className={`font-bold text-lg py-3 ${selected === index ? "text-[#1c0971]" : "text-black"}`}
                            >
                                {item.question}
                            </div>
                            <img src={selected === index ? UpArrow : DownArrow} alt="Dropdown Icon" className="w-4" />
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
    );
};

export default FaqSection;
