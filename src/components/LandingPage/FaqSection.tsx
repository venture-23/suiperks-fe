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
