import { useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { ConnectButton, useWallet } from "@suiet/wallet-kit";
import "./Navbar.scss";

import MenuImg from "../../assets/images/menu.png";
import CloseImg from "../../assets/images/crossIcon.png";

const Navbar = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const wallet = useWallet();

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
                        {/* <div>Logo</div> */}

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
                                to="/create-auction"
                                className={`nav-link ${location.pathname === "/create-auction" ? "active" : ""}`}
                            >
                                Create Auction
                            </NavLink>
                        </div>
                    </div>

                    <div className="right-section">
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
                            <div onClick={() => mobileNavigate("/create-auction")}>
                                <div className="mobile-nav-link">Create Auction</div>
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
