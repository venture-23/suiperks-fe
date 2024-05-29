const JoinUsSection = () => {
    return (
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
    );
};

export default JoinUsSection;
