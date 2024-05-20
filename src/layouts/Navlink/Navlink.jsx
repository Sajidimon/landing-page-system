import { FaExternalLinkAlt, FaHome, FaProductHunt, FaShopify, FaShoppingCart } from "react-icons/fa";
import { ImUsers } from "react-icons/im";
import { Link } from "react-router-dom";
import useAuth from "../../hook/useAuth/useAuth";


const Navlink = () => {

    const { userrole } = useAuth();


    return (
        <>

            <ul className="menu rounded-box">
                <li>
                    <Link to='/'><FaExternalLinkAlt /><button className="text-left">Visit site</button></Link>
                </li>
                <li>
                    <Link to='/admin-dashboard/home'><FaHome /><button className="text-left">Admin home</button></Link>
                </li>

                <li>
                    <details>
                        <summary><FaShopify /> Landing Page</summary>
                        <ul>
                            <li>
                                <Link to='/admin-dashboard/all-landing'> <button>All pages</button></Link>
                            </li>
                            <li>
                                <Link to='/admin-dashboard/add-landing'> <button>Add pages</button></Link>
                            </li>
                        </ul>
                    </details>
                </li>
                <li>
                    <details>
                        <summary><FaShoppingCart /> Orders</summary>
                        <ul>
                            <li>
                                <Link to='/admin-dashboard/orders'> <button>All Orders</button></Link>
                            </li>
                        </ul>
                    </details>
                </li>
                <li>
                    <details>
                        <summary><FaProductHunt />Products</summary>
                        <ul>
                            <li>
                                <Link to='/admin-dashboard/products'> <button>All Product</button></Link>
                            </li>
                            <li>
                                <Link to='/admin-dashboard/add-product'> <button>Add Product</button></Link>
                            </li>
                        </ul>
                    </details>
                </li>
                <li>
                    <details>
                        <summary><ImUsers />Users</summary>
                        <ul>
                            <li>
                                <Link to='/admin-dashboard/users'> <button>All user</button></Link>
                            </li>
                            <li>
                                <Link to='/admin-dashboard/addUser'> <button>Add user</button></Link>
                            </li>
                        </ul>
                    </details>
                </li>
            </ul>
        </>
    );
};

export default Navlink;