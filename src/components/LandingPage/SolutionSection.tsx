import React from "react";
import ResearchImg from "../../assets/images/research.png";
import DummyImg from "../../assets/images/000000.jpg";

const SolutionSection: React.FC = () => {
    return (
        <div className="flex md:flex-row flex-col gap-4 justify-between container mx-auto">
            <div className="flex flex-col gap-8">
                <div className="flex-1 rounded-2xl p-6 shadow-lg bg-white">
                    <div className="flex justify-between items-end mb-3 gap-4">
                        <h5 className="name text-[24px] font-semibold text-[#1c0971]">Research suggests</h5>
                        <img src={ResearchImg} className="w-[60px] h-[60px]" />
                    </div>
                    <div className="text-lg">
                        <p className="my-3">NFTs have untapped potential beyond transactions.</p>
                        <p>Traditional crowdfunding lacks trust due to centralization.</p>
                    </div>
                </div>
                <div className="flex-1 rounded-2xl p-6 shadow-lg">
                    <img src={DummyImg} />
                </div>
            </div>
            <div className=" ml-4 rounded-2xl shadow-lg bg-white md:p-6 p-3">
                <h5 className="name text-[32px] font-semibold mb-4 text-[#1c0971] text-center">Our Solution</h5>
                <div className="space-y-4 md:px-10 px-2">
                    <div>
                        <h6 className="text-2xl font-semibold">
                            Unlocking Community Governance <br />
                            <span className="text-xl text-[#1c0971]">Your PERKS, Your Power</span>
                        </h6>
                        <ul className="list-disc my-5 text-lg md:px-10 px-4">
                            <li>
                                SUI PERKS revolutionizes NFT ownership by transforming PERKS NFTs into gateways for
                                active participation.
                            </li>
                            <li>
                                Minting one Perk each day helps prevent pump-and-dump schemes, creating a secure
                                environment for investors and the community.
                            </li>
                            <li>
                                Holders gain exclusive rights to vote on proposals and submit their own, shaping the
                                direction of our platform.
                            </li>
                            <li>
                                Experience true decentralization where every PERKS holder has a say in our community's
                                future.
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h6 className="text-[24px] font-semibold">
                            Rewarding Engagement with Oxcoin
                            <br />
                            <span className="text-xl text-[#1c0971]">Recognizing Contribution</span>
                        </h6>
                        <ul className="list-disc my-5 text-lg md:px-10 px-4">
                            <li>Engagement isn't just valued at SUI PERKS—it's rewarded.</li>
                        </ul>
                    </div>
                </div>{" "}
            </div>
        </div>
    );
};

export default SolutionSection;
