import { useContext, useState } from "react";
import { FaHome, FaProductHunt, FaShoppingCart, FaExternalLinkAlt, FaShopify } from "react-icons/fa";
import { Link, Outlet } from "react-router-dom";
import { AuthContext } from "../../../provider/AuthProvider";
import { IoMenu } from "react-icons/io5";
import Navlink from "../../../layouts/Navlink/Navlink";


const AdminDashboard = () => {


    const { logout, loading } = useContext(AuthContext);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);


    if (loading) {
        return <span className="loading mx-auto block mt-52 loading-dots loading-lg"></span>;
    }

    const handleSignout = () => {
        logout()
            .then(() => { 
            })
        .then(error=>console.log(error))
    }

    return (
        <>
          
            <div className="flex min-h-screen">
                {/* Vertical Menu for Desktop */}
                <nav className="hidden md:block bg-gray-800 text-white flex-shrink-0">
                    <Navlink />
                    <div>
                        <Link to='/admin-login'><button onClick={handleSignout} className='w-full py-2 bg-red-600 hover:bg-red-700 rounded'> Logout</button></Link>
                    </div>
                </nav>

                {/* Content Area */}
                <div className="flex-1 p-4">
                    <header className="flex items-center justify-between md:hidden">
                        <button
                            className="text-gray-800 focus:outline-none"
                            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                        >
                            ☰
                        </button>
                    </header>

                    {/* Main Content */}
                    <main>
                        <Outlet></Outlet>
                    </main>
                </div>

                {/* Sidebar Menu for Mobile */}
                <div
                    className={`fixed inset-0 bg-gray-800 text-white p-4 transition-transform transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:hidden`}
                >
                    <button
                        className="text-white mb-4"
                        onClick={() => setIsSidebarOpen(false)}
                    >
                        ✕
                    </button>
                    <Navlink />
                    <div>
                        <Link to='/admin-login'><button onClick={handleSignout} className='w-full py-2 bg-red-600 hover:bg-red-700 rounded'> Logout</button></Link>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AdminDashboard;