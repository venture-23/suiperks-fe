import { useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { ConnectButton, useAccountBalance, useWallet } from "@suiet/wallet-kit";
import "./Navbar.scss";
import { useAppContext } from "../../context/AppContext";
import ActiveNFTDropDown from "../ActiveNFTDropDown";

import MenuImg from "../../assets/images/menu.png";
import CloseImg from "../../assets/images/crossIcon.png";
import UserImg from "../../assets/images/usericon.png";
import CopyIcon from "../../assets/images/copyIcon.png";

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
    const [userDropdownOpen, setUserDropdownOpen] = useState(false);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    const toggleUserDropdown = () => {
        setUserDropdownOpen(!userDropdownOpen);
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
            <div className="navbar">
                <div className="navbar-contents">
                    <div className="logos-and-links">
                        <NavLink to="/" className="font-bold text-xl" style={{ fontFamily: "Capriola, sans-serif" }}>
                            EthenaDAO
                        </NavLink>

                        <div className="nav-links ">
                            <NavLink
                                to="/proposals"
                                className={`nav-link ${location.pathname === "/proposals" ? "active" : ""}`}
                            >
                                Proposals
                            </NavLink>
                            <NavLink
                                to="/admin"
                                className={`nav-link ${location.pathname === "/admin" ? "active" : ""}`}
                            >
                                Admin
                            </NavLink>
                            <NavLink
                                to="/history"
                                className={`nav-link ${location.pathname === "/history" ? "active" : ""}`}
                            >
                                History
                            </NavLink>
                        </div>
                    </div>

                    <div className="flex items-center bg-gray-200 px-4 py-2 rounded-lg">
                        <div>Treasury: {formatBalance(treasuryBalance)} SUI</div>
                    </div>

                    <div className="right-section">
                        {wallet.connected ? (
                            <>
                                <NavLink
                                    to="/user-dashboard"
                                    className={`nav-link dashboard ${location.pathname === "/user-dashboard" ? "active" : ""}`}
                                >
                                    Dashboard
                                </NavLink>
                                <ActiveNFTDropDown />
                                <div className="relative">
                                    <img
                                        src={UserImg}
                                        className="w-[30px] h-[30px] cursor-pointer"
                                        onClick={toggleUserDropdown}
                                    />
                                    {userDropdownOpen && (
                                        <div className="absolute right-0 mt-4 w-48 bg-white border border-gray-300 rounded-lg shadow-lg p-4">
                                            <div className="flex justify-around font-bold py-3 border-b border-gray-800">
                                                <div>
                                                    {wallet.address
                                                        ? `${wallet.address.substring(0, 4)}...${wallet.address.substring(wallet.address.length - 4)}`
                                                        : "Address not available"}
                                                </div>
                                                <div
                                                    onClick={() => wallet.address && copyToClipboard(wallet.address)}
                                                    title={copyTooltip}
                                                >
                                                    <img src={CopyIcon} className="h-6" style={{ cursor: "pointer" }} />
                                                </div>
                                            </div>

                                            <div className="py-3 text-center font-normal text-base border-b border-gray-800">
                                                Balance&nbsp;
                                                <span className="font-bold text-lg">
                                                    {formatWalletBalance(walletBalance)} SUI
                                                </span>
                                            </div>
                                            <div className="py-3 text-center cursor-pointer" onClick={handleDisconnect}>
                                                Disconnect
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </>
                        ) : (
                            <div className="rounded-md border-2 border-gray-400">
                                <ConnectButton>Connect Wallet</ConnectButton>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <div className="mobile-navbar">
                <div className="mobile-navbar-content">
                    <div
                        onClick={() => mobileNavigate("/")}
                        className="font-bold text-xl text-black py-3"
                        style={{ fontFamily: "Capriola, sans-serif" }}
                    >
                        EthenaDAO
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
                            <div onClick={() => mobileNavigate("/proposals")}>
                                <div className="mobile-nav-link">Proposals</div>
                            </div>
                            <div onClick={() => mobileNavigate("/admin")}>
                                <div className="mobile-nav-link">Admin</div>
                            </div>
                            <div onClick={() => mobileNavigate("/history")}>
                                <div className="mobile-nav-link">History</div>
                            </div>
                            <div className="text-black py-3">
                                <div>Treasury: {formatBalance(treasuryBalance)} SUI</div>
                            </div>

                            {wallet.connected ? (
                                <>
                                    <div onClick={() => mobileNavigate("/user-dashboard")}>
                                        <div className="mobile-nav-link">Dashboard</div>
                                    </div>

                                    <div className="text-black py-3">
                                        <ActiveNFTDropDown />
                                    </div>
                                    <div className="flex justify-around font-bold py-3 text-black">
                                        <div>
                                            {wallet.address
                                                ? `${wallet.address.substring(0, 4)}...${wallet.address.substring(wallet.address.length - 4)}`
                                                : "Address not available"}
                                        </div>
                                        <div
                                            onClick={() => wallet.address && copyToClipboard(wallet.address)}
                                            title={copyTooltip}
                                        >
                                            <img src={CopyIcon} className="h-6" style={{ cursor: "pointer" }} />
                                        </div>
                                    </div>
                                    <div className="py-3  text-black">
                                        Balance&nbsp;
                                        <span className="font-bold text-lg">
                                            {formatWalletBalance(walletBalance)} SUI
                                        </span>
                                    </div>
                                    <div className="py-3  cursor-pointer text-black" onClick={handleDisconnect}>
                                        Disconnect
                                    </div>
                                </>
                            ) : (
                                <div className="py-3  text-black">
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
