import Hero from "../components/LandingPage/HeroSection";
import Card from "../components/LandingPage/Card";
import FaqSection from "../components/LandingPage/FaqSection";
import JoinUsSection from "../components/LandingPage/JoinUsSection";
import Footer from "../components/Footer";

import AuctionImg from "../assets/images/auction.png";
import ContributeImg from "../assets/images/contribute.png";
import EarnImg from "../assets/images/earnReward.png";

const LandingPage = () => {
    return (
        <>
            <div className="container mx-auto">
                <Hero />
                <div className="my-24">
                    <div className="flex md:flex-row flex-col gap-3">
                        <Card
                            imageSrc={AuctionImg}
                            title="Perks NFT"
                            description="Represents the daily minting of unique NFTs available for bidding."
                        />
                        <Card
                            imageSrc={ContributeImg}
                            title="Community Treasury"
                            description="Symbolizes the community-controlled treasury where funds are allocated and managed democratically."
                        />
                        <Card
                            imageSrc={EarnImg}
                            title="Equality and Empowerment"
                            description="Represents the principle of equality and symbolizes the power of each member's vote and voice in decision-making."
                        />
                    </div>
                </div>
                <FaqSection />
                <JoinUsSection />
            </div>
            <Footer />
        </>
    );
};

export default LandingPage;
