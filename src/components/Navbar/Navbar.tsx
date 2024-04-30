import { Link } from "react-router-dom";
import { ConnectButton } from "@suiet/wallet-kit";

import "./Navbar.scss";

const Navbar = () => {
    return (
        <div className="navbar">
            <div className="navbar-contents">
                <div className="logos-and-links">
                    {/* <div>Logo</div> */}

                    <div className="nav-links ">
                        <Link to="/">
                            <div className="nav-link border b-2 border-zinc-400  rounded-md hover:border-b hover:border-zinc-700">
                                Home
                            </div>
                        </Link>
                        <Link to="/proposals">
                            <div className="nav-link border b-2 border-zinc-400  rounded-md hover:border-b hover:border-zinc-700">
                                Proposals
                            </div>
                        </Link>
                    </div>
                </div>

                <div className="right-section">
                    <ConnectButton />
                </div>
            </div>
        </div>
    );
};

export default Navbar;
