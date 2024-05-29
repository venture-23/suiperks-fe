import React from "react";

interface CardProps {
    imageSrc: string;
    title: string;
    description: string;
}

const Card: React.FC<CardProps> = ({ imageSrc, title, description }) => {
    return (
        <div className="relative mx-auto mt-12 w-[384px] h-[235px] border border-gray-300 text-center bg-[#D9D9D9] rounded-[15px] flex flex-col items-center justify-center">
            <div className="absolute inset-x-0 top-0 flex justify-center -translate-y-1/2">
                <div className="md:w-[90px] md:h-[90px] w-[60px] h-[60px] bg-[#58B1BD] border-[12px] border-solid border-[#58B1BD] rounded-full flex items-center justify-center text-[18px] font-medium">
                    <img src={imageSrc} alt={title} />
                </div>
            </div>
            <div className="pt-8">
                <div className="name md:text-[32px] text-xl mb-3">{title}</div>
                <p className="font-semibold text-base max-w-[331px]">{description}</p>
            </div>
        </div>
    );
};

export default Card;
