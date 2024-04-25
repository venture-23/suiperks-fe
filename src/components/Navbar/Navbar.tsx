import "./Navbar.scss";

const Navbar = () => {
    return (
        <div className="navbar">
            <div className="navbar-contents">
                <div className="logos-and-links">
                    {/* <div>Logo</div> */}

                    <div className="nav-links">
                        <div className="nav-link">Home</div>
                    </div>
                </div>

                <div className="right-section">
                    <button>Connect</button>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
