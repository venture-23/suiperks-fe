import Logo from "../assets/images/suiPerks.png";

const Footer = () => {
    return (
        <div className="bg-[#F0F5FF]">
            <div className="pt-3 container mx-auto">
                <div className="flex flex-col md:flex-row justify-between font-manrope my-20 gap-8 md:gap-0">
                    <div className="text-center md:text-left md:w-1/3">
                        <p className="flex gap-2 font-bold text-2xl mb-6 justify-center md:justify-start">
                            <img src={Logo} alt="LocalCoin Logo" />
                        </p>
                    </div>
                    <div className="md:gap-32 gap-10 text-center md:text-left">
                        <p className="sm:text-lg xs:text-base font-bold mb-3">Social Media</p>
                        <div className="sm:text-base xs:text-xs font-normal flex flex-col gap-3">
                            <a
                                href="https://twitter.com/venture23xyz?s=21&t=tlXzS2NHyOryUJMHUPNgMg"
                                target="_blank"
                                className="hover:text-gray-600"
                            >
                                Twitter
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Footer;
