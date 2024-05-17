import { useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { ConnectButton, useWallet } from "@suiet/wallet-kit";
import "./Navbar.scss";
import { useAppContext } from "../../context/AppContext";

import MenuImg from "../../assets/images/menu.png";
import CloseImg from "../../assets/images/crossIcon.png";

const Navbar = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const wallet = useWallet();
    const { treasuryBalance } = useAppContext();

    const formatBalance = (balance: number | undefined): string => {
        if (typeof balance !== "number") {
            return "0.00";
        }
        const formattedBalance = balance / 10 ** 9;
        return formattedBalance.toFixed(2);
    };

    const [menuOpen, setMenuOpen] = useState(false);
    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    const mobileNavigate = (url: string) => {
        navigate(url);
        setMenuOpen(false);
    };

    return (
        <>
            <div className="navbar">
                <div className="navbar-contents">
                    <div className="logos-and-links">
                        <div className="nav-links ">
                            <NavLink to="/" className={`nav-link ${location.pathname === "/" ? "active" : ""}`}>
                                Home
                            </NavLink>
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

                    <div className="right-section">
                        <div className="bg-gray-200 px-4 py-2 rounded-lg">
                            <div>Treasury: {formatBalance(treasuryBalance)} SUI</div>
                        </div>

                        {wallet.connected && (
                            <NavLink
                                to="/user-dashboard"
                                className={`nav-link dashboard ${location.pathname === "/user-dashboard" ? "active" : ""}`}
                            >
                                Dashboard
                            </NavLink>
                        )}

                        <ConnectButton>Connect Wallet</ConnectButton>
                    </div>
                </div>
            </div>

            <div className="mobile-navbar">
                <div className="mobile-navbar-content">
                    <div className="connect-wallet pl-4">
                        <ConnectButton>Connect Wallet</ConnectButton>
                    </div>

                    <div className="toggle pr-4">
                        {menuOpen ? (
                            <img src={CloseImg} className="w-[30px] h-[30px]" onClick={toggleMenu} />
                        ) : (
                            <img src={MenuImg} className="w-[30px] h-[30px]" onClick={toggleMenu} />
                        )}
                    </div>

                    {menuOpen && <div className="overlay" onClick={toggleMenu}></div>}
                    {menuOpen && (
                        <div className="dropdown-menu">
                            <div onClick={() => mobileNavigate("/")}>
                                <div className="mobile-nav-link">Home</div>
                            </div>
                            <div onClick={() => mobileNavigate("/proposals")}>
                                <div className="mobile-nav-link">Proposals</div>
                            </div>
                            <div onClick={() => mobileNavigate("/admin")}>
                                <div className="mobile-nav-link">Admin</div>
                            </div>
                            <div onClick={() => mobileNavigate("/history")}>
                                <div className="mobile-nav-link">History</div>
                            </div>
                            {wallet.connected && (
                                <div onClick={() => mobileNavigate("/user-dashboard")}>
                                    <div className="mobile-nav-link">Dashboard</div>
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
