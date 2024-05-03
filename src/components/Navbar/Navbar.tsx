import { NavLink, useLocation } from "react-router-dom";
import { ConnectButton, useWallet } from "@suiet/wallet-kit";

import "./Navbar.scss";

const Navbar = () => {
    const location = useLocation();
    const wallet = useWallet();

    return (
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
    );
};

export default Navbar;
