import React from "react";

const SolutionSection: React.FC = () => {
    return (
        <div className="flex flex-col items-center">
            <h5 className="name text-[32px] font-semibold mb-4 text-[#1c0971] text-center">Our Solution</h5>
            <div className="rounded-2xl shadow-lg bg-white md:p-6 p-3 md:w-3/5 w-[80vw] mx-auto">
                <div>
                    <h6 className="text-2xl font-semibold">
                        Unlocking Community Governance <br />
                        <span className="text-xl text-[#1c0971]">Your PERKS, Your Power</span>
                    </h6>
                    <ul className="list-disc my-5 text-lg md:px-10 px-4">
                        <li>
                            <b>Transformative NFTs</b>
                            <br />
                            SUIPerks revolutionizes NFT ownership by making PERKS NFTs gateways to active participation
                            in our platform.
                        </li>
                        <li>
                            <b>Fair Minting</b>
                            <br />
                            Minting one PERK daily helps prevent pump-and-dump schemes, fostering a secure environment
                            for investors and the community.
                        </li>
                        <li>
                            <b>Exclusive Rights</b>
                            <br />
                            NFT holders gain the right to vote on proposals and submit their own, shaping the platform's
                            direction.
                        </li>
                        <li>
                            <b>True Decentralization</b>
                            <br />
                            Experience genuine decentralization where every PERKS holder has a say in our community's
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
                        <li>
                            <b>Engagement Rewards</b>
                            <br />
                            At SUIPerks, your engagement is not only valued but rewarded. Active participants receive
                            Oxcoin as recognition for their contributions, incentivizing ongoing involvement and
                            commitment to the community's growth.
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default SolutionSection;
