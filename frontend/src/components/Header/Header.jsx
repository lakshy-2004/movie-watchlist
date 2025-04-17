// node modules
import { useState } from "react";

// components
import Navbar from "./Navbar";


const Header = () => {

    const [navOpen, setNavOpen] = useState(false);

    return (
        <header
            className="fixed top-0 left-0 w-full h-20 flex items-center z-40 bg-gradient-to-b from-zinc-900 to-zinc-900/0"
        >
            <div className="max-w-screen-2xl w-full mx-auto px-4 flex justify-between items-center md:px-6 md:grid md:grid-cols-[1fr_3fr_1fr]"> 
                <h1>
                    <a 
                    href="/" 
                    className="logo"
                    >
                        <img 
                        src="/newlogo.png" 
                        width={40}
                        height={40}
                        alt="Logo"
                        className="w-20"
                        />
                    </a>
                </h1>

                <div className="relative md:justify-self-center text-white">
                    <button 
                    className="menu-btn"
                    onClick={() => setNavOpen((prev) => !prev)}
                    >
                        <span className="material-symbols-rounded">
                            {navOpen ? 'close':'menu'}
                        </span>
                    </button>

                    <Navbar
                        navOpen={navOpen}
                    />

                </div>


            </div>
        </header>
    );
}

export default Header;