import { useState, useEffect, ChangeEvent, useRef } from "react";
import "../assets/stylings/ActiveBid.scss";
import { Auction, createBidAuctionTxb, getActiveAuctionDetails } from "../services/activeBidServices";
import { useAccountBalance, useWallet } from "@suiet/wallet-kit";

import SUIIcon from "../assets/images/sui-sui-logo.png";
import UserIconImg from "../assets/images/usericon.png";
import CloseIconImg from "../assets/images/crossIcon.png";
import useCountdown from "../utils/countdownUtils";

type BidItem = {
    userImg: string;
    username: string;
    amount: number;
    transactionLink?: string;
    bidTime: string;
};

// Todo: Update according to BE response
type AuctionItem = {
    _id: string;
    uid: string;
    nftImage: string;
    nftName: string;
    nftDescription: string;
    title: string;
    description: string;
    amount: number;
    reservePrice: number;
    duration: number;
    startTime: string;
    endTime: string;
    minBidIncrementPercentage: number;
    settled: boolean;
    funds: { address: string; balance: number; _id: string }[];
    createdAt: string;
    __v: number;
    highestBidder: string;
};

const ActiveBid = () => {
    const wallet = useWallet();
    const [inputBid, setInputBid] = useState("");
    const [bids, setBids] = useState<BidItem[]>([]);
    const [currentBid, setCurrentBid] = useState("0.00");
    const [showViewAllBidsModal, setShowViewAllBidsModal] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [showCountdown, setShowCountdown] = useState(true);

    const [auctionItemDetails, setAuctionItemDetails] = useState<AuctionItem>({
        _id: "",
        uid: "",
        nftImage: "",
        nftName: "",
        nftDescription: "",
        title: "",
        description: "",
        amount: 0,
        reservePrice: 0,
        duration: 0,
        startTime: "",
        endTime: "",
        minBidIncrementPercentage: 0,
        settled: false,
        funds: [],
        createdAt: "",
        __v: 0,
        highestBidder: "",
    });

    const countdownTimer = useCountdown(new Date(auctionItemDetails.endTime));

    const { balance = 0n } = useAccountBalance();

    const modalRef = useRef<HTMLDivElement>(null);

    const formattedMonthDay = new Date(auctionItemDetails.endTime).toLocaleString("en-US", {
        month: "long",
        day: "numeric",
    });

    const formattedTime = new Date(auctionItemDetails.endTime).toLocaleString("en-US", {
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
        hour12: true,
    });

    useEffect(() => {
        const timer = setInterval(() => {}, 1000);
        return () => clearInterval(timer);
    }, [auctionItemDetails.endTime]);

    const toggleDisplay = () => {
        setShowCountdown((prev) => !prev);
    };

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        const bidValue = event.target.value;
        setInputBid(bidValue);

        const bidAmount = parseFloat(bidValue) * 10 ** 9;

        if (!isNaN(bidAmount) && bidAmount > balance) {
            setErrorMessage("Bid amount exceeds wallet balance.");
        } else {
            setErrorMessage("");
        }
    };

    const handleSubmit = async () => {
        const amount = Number(inputBid) * 10 ** 9;
        const input = Number(inputBid);
        const bidAmount = parseFloat(`${amount}`);

        const intBidAmount = Math.floor(bidAmount);
        const minBid = parseFloat(currentBid) + parseFloat(currentBid) * 0.05;

        if (input < minBid) {
            setErrorMessage(`Bid amount must be at least ${minBid.toFixed(2)}.`);
            return;
        }

        if (!isNaN(bidAmount) && bidAmount >= minBid) {
            try {
                const txb = createBidAuctionTxb(intBidAmount, auctionItemDetails.uid);
                const txnResponse = await wallet.signAndExecuteTransactionBlock({
                    // @ts-expect-error transactionBlock type mismatch error between @suiet/wallet-kit and @mysten/sui.js
                    transactionBlock: txb,
                });
                console.log("txnResponse", txnResponse);
                if (txnResponse?.digest) {
                    console.log("Bid auction digest:", txnResponse?.digest);

                    const newBid: BidItem = {
                        userImg: UserIconImg,
                        username: "User",
                        amount: intBidAmount,
                        //transactionLink: "https://etherscan.io/tx/...",
                        bidTime: new Date().toLocaleString(),
                    };
                    const updatedBids = [...bids, newBid];
                    setBids(updatedBids);
                    const newBidValue = intBidAmount + intBidAmount * 0.05; // 5% increment to bid price
                    setCurrentBid(newBidValue.toString());
                    setInputBid("");
                    setErrorMessage("");
                }
            } catch (error) {
                console.error("Error placing bid:", error);
                setErrorMessage("Error placing bid. Please try again later.");
            }
        } else {
            setErrorMessage(`Bid amount must be at least ${minBid}`);
            setTimeout(() => {
                setErrorMessage("");
            }, 3000);
        }
    };

    const handleViewMore = () => {
        setShowViewAllBidsModal(true);
    };

    const handleCloseModal = () => {
        setShowViewAllBidsModal(false);
    };

    const handleOutsideClick = (event: MouseEvent) => {
        if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
            setShowViewAllBidsModal(false);
        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleOutsideClick);
        return () => {
            document.removeEventListener("mousedown", handleOutsideClick);
        };
    }, []);

    // useEffect(() => {
    //     const highestBid = bids.reduce(
    //         (maxBid, bid) => (parseFloat(bid.amount.toString()) > maxBid ? parseFloat(bid.amount.toString()) : maxBid),
    //         0
    //     );
    //     setCurrentBid(highestBid.toFixed(2));

    //     const sortedBids = [...bids].sort((a, b) => parseFloat(b.amount.toString()) - parseFloat(a.amount.toString()));
    //     setBids(sortedBids);

    //     const currentDate = new Date();
    //     const endDate = new Date(currentDate.getTime() + 24 * 60 * 60 * 1000);
    //     setEndDate(endDate);
    // }, []);

    useEffect(() => {
        const fetchAuctionDetails = async () => {
            try {
                const auctionData = await getActiveAuctionDetails();
                if (auctionData) {
                    setAuctionItemDetails(auctionData);
                    setCurrentBid((auctionData.amount * 10 ** -9).toString());
                } else {
                    console.log("no auction data");
                }
            } catch (error) {
                console.error("Error fetching auction details:", error);
            }
        };

        fetchAuctionDetails();
    }, []);

    return (
        <div className="active-bid flex md:flex-row flex-col items-center justify-center">
            <div className="image flex justify-center mb-6 md:mb-0">
                <img src={auctionItemDetails.nftImage} alt="Auction Image" className="md:h-auto md:w-2/3 h-2/5 w-2/5" />
            </div>
            <div className="details">
                <div className="auction-details mb-5">
                    <div className="title  text-xl text-gray-500 font-bold">{auctionItemDetails.title}</div>
                    <div className="description text-sm">{auctionItemDetails.description}</div>
                </div>
                <div className="date text-lg text-gray-500 font-bold mb-3">
                    {new Date(auctionItemDetails.startTime).toLocaleString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                    })}
                </div>

                <h1 className="name mb-3 md:text-7xl text-4xl ">{auctionItemDetails.nftName}</h1>
                <p className="mb-8 md:text-lg text-sm border-b border-gray-700">{auctionItemDetails.description}</p>
                <div className="flex md:flex-row flex-col md:gap-14 gap-7">
                    <div className="flex md:flex-col items-center md:justify-center justify-between">
                        <h2 className="md:text-lg text-base text-gray-500 font-bold mb-2">Current Bid</h2>
                        <h3 className="md:text-3xl text-2xl font-bold flex items-center gap-2">
                            <img src={SUIIcon} className="w-5 h-5" />
                            {currentBid}
                        </h3>
                    </div>
                    <div
                        className="flex md:flex-col items-center md:justify-center justify-between md:pl-4 md:border-l md:border-gray-700 md:w-64"
                        onClick={toggleDisplay}
                        style={{ cursor: "pointer" }}
                    >
                        {!showCountdown ? (
                            <h2 className="md:text-lg text-base text-gray-500 font-bold mb-2">
                                Ends on {formattedMonthDay}
                            </h2>
                        ) : (
                            <h2 className="md:text-lg text-base text-gray-500 font-bold mb-2">Ends in</h2>
                        )}

                        <div className="date md:text-3xl text-2xl font-bold">
                            {showCountdown ? countdownTimer : ` ${formattedTime}`}
                        </div>
                    </div>
                </div>
                <div className="input-section mt-7">
                    <input
                        type="text"
                        value={inputBid}
                        onChange={handleInputChange}
                        placeholder={`${(parseFloat(currentBid) + parseFloat(currentBid) * 0.05).toFixed(2)} or more`}
                        className="input-field"
                    />
                    <button
                        onClick={handleSubmit}
                        className="bid-button"
                        disabled={balance === undefined || balance === null || parseFloat(inputBid) * 10 ** 9 > balance}
                    >
                        Place Bid
                        <span className="tooltip">Bid amount cannot exceed wallet balance</span>
                    </button>
                </div>
                {errorMessage && <div className="error-message">{errorMessage}</div>}

                <div className="list-container flex flex-col">
                    <ul className="bid-list mt-6 gap-10 md:text-xl">
                        {auctionItemDetails.funds
                            ?.sort((a, b) => b.balance - a.balance)
                            .map((fund, index) => (
                                <li key={index}>
                                    <span className="username flex items-center gap-2">
                                        <img src={UserIconImg} className="h-5 w-5" />
                                        {fund.address.slice(0, 4)}...{fund.address.slice(-4)}
                                    </span>
                                    <span className="font-bold flex items-center gap-2 justify-end">
                                        <img src={SUIIcon} className="w-3 h-3" />
                                        {(fund.balance * 10 ** -9).toString()}
                                    </span>
                                </li>
                            ))}
                    </ul>
                    <div className="view-more-button">
                        <button onClick={handleViewMore} className="md:text-lg text-base text-gray-500 font-bold mb-2">
                            View all bids
                        </button>
                    </div>
                </div>

                {showViewAllBidsModal && (
                    <div className="modal-wrapper">
                        <div ref={modalRef} className="modal">
                            <button className="close-button" onClick={handleCloseModal}>
                                <img src={CloseIconImg} className="w-8 h-8" />
                            </button>
                            <div className="modal-content">
                                <div className="description">
                                    <h4 className="text-lg text-gray-500 font-bold">Bids for</h4>
                                    <h1 className="name mb-3 md:text-7xl text-4xl">{auctionItemDetails.nftName}</h1>
                                </div>
                                <div className="list-container flex flex-col">
                                    <ul className="popup-bid-list mt-6 gap-10 md:text-xl">
                                        {auctionItemDetails.funds
                                            ?.sort((a, b) => b.balance - a.balance)
                                            .map((fund, index) => (
                                                <li key={index}>
                                                    <span className="username flex items-center gap-2">
                                                        <div className="icon-container">
                                                            <img src={UserIconImg} className="h-5 w-5" />
                                                        </div>
                                                        <div className="username-container flex flex-col">
                                                            <span className="username">
                                                                {fund.address.slice(0, 4)}...{fund.address.slice(-4)}
                                                            </span>
                                                        </div>
                                                    </span>
                                                    <span className="font-bold flex items-center gap-2 justify-end">
                                                        <img src={SUIIcon} className="md:w-3 w-2 md:h-3 h-2" />
                                                        {(fund.balance * 10 ** -9).toString()}
                                                    </span>
                                                </li>
                                            ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ActiveBid;
