import { useState, useEffect, ChangeEvent, useRef } from "react";
import "../../assets/stylings/ActiveBid.scss";
import { createBidAuctionTxb } from "../../services/bidAmount";
import { useWallet } from "@suiet/wallet-kit";

import PopOutImg from "../../assets/images/popout.png";
import BarImg from "../../assets/images/bars.png";
import UserIconImg from "../../assets/images/usericon.png";
import CloseIconImg from "../../assets/images/crossIcon.png";

type BidItem = {
    userImg: string;
    username: string;
    amount: number;
    transactionLink?: string;
    bidTime: string;
};

// Todo: Update according to BE response
type AuctionItem = {
    auctionInfoId: string;
}

const ActiveBid = () => {
    const wallet = useWallet();
    const [inputBid, setInputBid] = useState("");
    const [bids, setBids] = useState<BidItem[]>([]);
    const [endDate, setEndDate] = useState<Date>(new Date("2024-04-27T12:00:00"));
    const [itemName, setItemName] = useState("NFT N");
    const [currentBid, setCurrentBid] = useState("0.00");
    const [showViewAllBidsModal, setShowViewAllBidsModal] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const [auctionItemDetails, setAuctionItemDetails] = useState<AuctionItem>({
        auctionInfoId: "",
    });

    const modalRef = useRef<HTMLDivElement>(null);

    const auctionDate = "April 26, 2024";

    useEffect(() => {
        const highestBid = bids.reduce(
            (maxBid, bid) => (parseFloat(bid.amount.toString()) > maxBid ? parseFloat(bid.amount.toString()) : maxBid),
            0
        );
        setCurrentBid(highestBid.toFixed(2));

        const sortedBids = [...bids].sort((a, b) => parseFloat(b.amount.toString()) - parseFloat(a.amount.toString()));
        setBids(sortedBids);

        const currentDate = new Date();
        const endDate = new Date(currentDate.getTime() + 24 * 60 * 60 * 1000);
        setEndDate(endDate);
    }, []);

    const handleBidSubmit = (event: ChangeEvent<HTMLInputElement>) => {
        setInputBid(event.target.value);
    };

    const handleSubmit = async () => {
        const amount = Number(inputBid) * (10 ** 9);
        const bidAmount = parseFloat(`${amount}`);
        const minBid = parseFloat(currentBid) + 0.01;
        const intBidAmount = Math.floor(bidAmount);

        if (!isNaN(bidAmount) && bidAmount >= minBid) {
            try {
                const txb = createBidAuctionTxb(intBidAmount, auctionItemDetails.auctionInfoId);
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
                    setInputBid("");
                    setErrorMessage("");
                }
            } catch (error) {
                console.error("Error placing bid:", error);
                setErrorMessage("Error placing bid. Please try again later.");
            }
        } else {
            setErrorMessage(`Bid amount must be at least ${minBid.toFixed(2)}`);
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

    const formattedMonthDay = endDate.toLocaleString("en-US", {
        month: "long",
        day: "numeric",
    });
    const formattedTime = endDate.toLocaleString("en-US", {
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
        hour12: true,
    });

    return (
        <div className="active-bid">
            <div className="date text-lg text-gray-500 font-bold">{auctionDate}</div>
            <h1 className="name mb-3 md:text-7xl text-4xl">{itemName}</h1>
            <div className="flex md:flex-row flex-col md:gap-14 gap-7">
                <div className="flex md:flex-col items-center md:justify-center justify-between">
                    <h2 className="md:text-lg text-base text-gray-500 font-bold mb-2">Current Bid</h2>
                    <h3 className="md:text-3xl text-2xl font-bold flex items-center gap-2">
                        <img src={BarImg} className="w-5 h-5" />
                        {currentBid}
                    </h3>
                </div>
                <div className="flex md:flex-col items-center md:justify-center justify-between md:pl-4 md:border-l md:border-gray-700">
                    <h2 className="md:text-lg text-base text-gray-500 font-bold mb-2">
                        Ends on {formattedMonthDay} at
                    </h2>
                    <h3 className="md:text-3xl text-2xl font-bold">{formattedTime}</h3>
                </div>
            </div>
            <div className="input-section mt-7">
                <input
                    type="text"
                    value={inputBid}
                    onChange={handleBidSubmit}
                    placeholder={`${parseFloat(currentBid) + 0.01} or more`}
                    className="input-field"
                />
                <button onClick={handleSubmit} className="bid-button">
                    Place Bid
                </button>
            </div>
            {errorMessage && <div className="error-message">{errorMessage}</div>}

            <div className="list-container flex flex-col">
                <ul className="bid-list mt-6 gap-10 md:text-xl">
                    {bids.slice(0, 2).map((bid, index) => (
                        <li key={index}>
                            <span className="username flex items-center gap-2">
                                <img src={bid.userImg} className="h-5 w-5" />
                                {bid.username}
                            </span>
                            <span className="font-bold flex items-center gap-2 justify-end">
                                <img src={BarImg} className="w-3 h-3" />
                                {bid.amount}
                                <a href={bid.transactionLink} target="_blank">
                                    <img src={PopOutImg} alt="Pop Out" className="pop-out-img h-4 w-4" />
                                </a>
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
                                <h1 className="name mb-3 md:text-7xl text-4xl">{itemName}</h1>
                            </div>
                            <div className="list-container flex flex-col">
                                <ul className="popup-bid-list mt-6 gap-10 md:text-xl">
                                    {bids.map((bid, index) => (
                                        <li key={index}>
                                            <span className="username flex items-center gap-2">
                                                <div className="icon-container">
                                                    <img src={bid.userImg} className="h-5 w-5" />
                                                </div>
                                                <div className="username-container flex flex-col">
                                                    <span>{bid.username}</span>
                                                    <span className="md:text-sm text-xs">{bid.bidTime}</span>
                                                </div>
                                            </span>
                                            <span className="font-bold flex items-center gap-2 justify-end">
                                                <img src={BarImg} className="md:w-3 w-2 md:h-3 h-2" />
                                                {bid.amount}
                                                <a href={bid.transactionLink} target="_blank">
                                                    <img
                                                        src={PopOutImg}
                                                        alt="Pop Out"
                                                        className="pop-out-img h-4 w-4"
                                                    />
                                                </a>
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
    );
};

export default ActiveBid;
