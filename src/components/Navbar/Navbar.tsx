import { useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { ConnectButton, useAccountBalance, useWallet } from "@suiet/wallet-kit";
import "./Navbar.scss";
import { useAppContext } from "../../context/AppContext";
import ActiveNFTDropDown from "../ActiveNFTDropDown";

import MenuImg from "../../assets/images/menu.png";
import CloseImg from "../../assets/images/crossIcon.png";
import UserImg from "../../assets/images/user-icon-on-transparent-backgro.png";
import CopyIcon from "../../assets/images/copyIcon.png";
import Logo from "../../assets/images/suiPerks.png";

const Navbar = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const wallet = useWallet();
    const { disconnect } = wallet;
    const { treasuryBalance } = useAppContext();
    const [copyTooltip, setCopyTooltip] = useState("Copy wallet address");
    const { balance: walletBalance = 0n } = useAccountBalance();

    const formatBalance = (balance: number | undefined): string => {
        if (typeof balance !== "number") {
            return "0.00";
        }
        const formattedBalance = balance / 10 ** 9;
        return formattedBalance.toFixed(2);
    };

    const formatWalletBalance = (balance: number | bigint | undefined): string => {
        if (typeof balance === "undefined") {
            return "0.00";
        }

        const formattedWalletBalance = Number(balance) / 10 ** 9;
        return formattedWalletBalance.toFixed(2);
    };

    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    const mobileNavigate = (url: string) => {
        navigate(url);
        setMenuOpen(false);
    };

    const handleDisconnect = () => {
        disconnect();
    };

    const copyToClipboard = (text: string) => {
        navigator.clipboard
            .writeText(text)
            .then(() => {
                setCopyTooltip("Copied");
                setTimeout(() => {
                    setCopyTooltip("Copy wallet address");
                }, 5000);
            })
            .catch((error) => {
                console.error("Error copying to clipboard: ", error);
            });
    };

    return (
        <>
            <div className="navbar bg-[#1c0971] z-40 xl:px-10 px-2">
                <div className="navbar-contents">
                    <div className="logos-and-links">
                        <div className="nav-links text-white ">
                            <NavLink
                                to="/"
                                //className="font-bold text-xl text-white"
                            >
                                <img src={Logo} className="h-10" />
                            </NavLink>
                            <NavLink
                                to="/auction"
                                className={`nav-link ${location.pathname === "/auction" ? "active" : ""}`}
                            >
                                Auction
                            </NavLink>
                            <NavLink
                                to="/proposals"
                                className={`nav-link ${location.pathname === "/proposals" ? "active" : ""}`}
                            >
                                Proposals
                            </NavLink>
                            <NavLink
                                to="/history"
                                className={`nav-link ${location.pathname === "/history" ? "active" : ""}`}
                            >
                                History
                            </NavLink>
                            <NavLink
                                to="/leaderboard"
                                className={`nav-link ${location.pathname === "/leaderboard" ? "active" : ""}`}
                            >
                                Leaderboard
                            </NavLink>
                        </div>
                    </div>

                    <div className="right-section">
                        <div className="bg-[rgba(235,235,235,0.8)] px-4 py-2 rounded-lg font-semibold cursor-pointer h-[48px] flex justify-center items-center">
                            <div>Treasury: {formatBalance(treasuryBalance)} SUI</div>
                        </div>
                        {wallet.connected ? (
                            <>
                                <ActiveNFTDropDown />
                                <div className="relative group">
                                    <img src={UserImg} className="w-auto h-[40px] cursor-pointer text-white" />
                                    <div className="pt-2 hidden group-hover:block absolute right-0 min-w-[250px]">
                                        <div className="bg-[rgba(235,235,235,0.8)] rounded-lg p-4">
                                            <div className="flex flex-col gap-2">
                                                <NavLink
                                                    to="/dashboard"
                                                    className={`nav-link ${location.pathname === "/dashboard" ? "active" : ""} font-bold text-black bg-white px-1 py-2 rounded`}
                                                >
                                                    Dashboard
                                                </NavLink>
                                                <div className="font-bold text-black">
                                                    <p className="text-[10px] text-[#7f7f7f]">Wallet Address</p>
                                                    <div className="flex gap-1">
                                                        <div>
                                                            {wallet.address
                                                                ? `${wallet.address.substring(0, 6)}...${wallet.address.substring(wallet.address.length - 6)}`
                                                                : "Address not available"}
                                                        </div>
                                                        <div
                                                            onClick={() =>
                                                                wallet.address && copyToClipboard(wallet.address)
                                                            }
                                                            title={copyTooltip}
                                                        >
                                                            <img
                                                                src={CopyIcon}
                                                                className="h-6"
                                                                style={{ cursor: "pointer" }}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="text-black">
                                                    Balance:&nbsp;
                                                    <span className="font-bold text-lg">
                                                        {formatWalletBalance(walletBalance)} SUI
                                                    </span>
                                                </div>
                                                <button
                                                    className="text-white bg-red-500 p-2 rounded-lg w-full"
                                                    onClick={handleDisconnect}
                                                >
                                                    Disconnect
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </>
                        ) : (
                            <div>
                                <ConnectButton>Connect Wallet</ConnectButton>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <div className="mobile-navbar">
                <div className="mobile-navbar-content">
                    <div onClick={() => mobileNavigate("/")} className="mx-6">
                        <img src={Logo} className="h-10" />
                    </div>

                    <div className="flex items-center gap-3 pr-4">
                        {menuOpen ? (
                            <img src={CloseImg} className="w-[30px] h-[30px]" onClick={toggleMenu} />
                        ) : (
                            <img src={MenuImg} className="w-[30px] h-[30px]" onClick={toggleMenu} />
                        )}
                    </div>

                    {menuOpen && <div className="overlay" onClick={toggleMenu}></div>}
                    {menuOpen && (
                        <div className="dropdown-menu">
                            <div className="mobile-nav-link" onClick={() => mobileNavigate("/auction")}>
                                Auction
                            </div>
                            <div className="mobile-nav-link" onClick={() => mobileNavigate("/proposals")}>
                                Proposals
                            </div>
                            <div className="mobile-nav-link" onClick={() => mobileNavigate("/history")}>
                                History
                            </div>
                            <div className="mobile-nav-link" onClick={() => mobileNavigate("/leaderboard")}>
                                Leaderboard
                            </div>

                            <div className="text-black py-3">
                                <div>Treasury: {formatBalance(treasuryBalance)} SUI</div>
                            </div>

                            {wallet.connected ? (
                                <>
                                    <div className="mobile-nav-link" onClick={() => mobileNavigate("/dashboard")}>
                                        Dashboard
                                    </div>

                                    <div className="text-black py-3">
                                        <ActiveNFTDropDown />
                                    </div>

                                    <div className="user-details-mobile flex flex-col items-center bg-[#f0e7e7] w-full max-w-[400px] rounded-lg mb-4 p-4 gap-3">
                                        <div className="font-bold text-black">
                                            <p className="text-[10px] text-[#7f7f7f] text-center">Wallet Address</p>
                                            <div className="flex gap-1">
                                                <div>
                                                    {wallet.address
                                                        ? `${wallet.address.substring(0, 6)}...${wallet.address.substring(wallet.address.length - 6)}`
                                                        : "Address not available"}
                                                </div>
                                                <div
                                                    onClick={() => wallet.address && copyToClipboard(wallet.address)}
                                                    title={copyTooltip}
                                                >
                                                    <img src={CopyIcon} className="h-6" style={{ cursor: "pointer" }} />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="text-black">
                                            Balance:&nbsp;
                                            <span className="font-bold text-lg">
                                                {formatWalletBalance(walletBalance)} SUI
                                            </span>
                                        </div>
                                        <button
                                            className="text-white bg-red-500 p-2 rounded-lg w-full"
                                            onClick={handleDisconnect}
                                        >
                                            Disconnect
                                        </button>
                                    </div>
                                </>
                            ) : (
                                <div>
                                    <ConnectButton>Connect Wallet</ConnectButton>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default Navbar;
