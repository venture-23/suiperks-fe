import { NavLink, useLocation } from "react-router-dom";
import { ConnectButton } from "@suiet/wallet-kit";

import "./Navbar.scss";

const Navbar = () => {
    const location = useLocation();

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
                    </div>
                </div>

                <div className="right-section">
                    <ConnectButton>Connect Wallet</ConnectButton>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
