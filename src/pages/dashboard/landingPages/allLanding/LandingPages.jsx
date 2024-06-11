import { useContext, useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa";
import { IoIosEye } from "react-icons/io";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../../provider/AuthProvider";
import { deleteLanding } from "../../../../api/landing";


const LandingPages = () => {

    const { user, loading } = useContext(AuthContext);
    const [pages, setPages] = useState([])


    useEffect(() => {
        if (user?.email) {
            fetch(`${import.meta.env.VITE_API_URL}/landing?email=${user?.email}`)
                .then(res => res.json())
                .then(data => {
                    setPages(data)
                })
        }
    }, [user?.email])

    if (loading) {
        return <span className="loading mx-auto block mt-40 loading-dots loading-lg"></span>;
    }


    const hanldeLandingDelete = id => {
        deleteLanding(id).then(() => {
            setPages(pages.filter(page => page._id !== id))
        }).catch(error => console.log(error))
    }



    return (
        <div className="bg-[#F0F0F1] text-black ">
            <div className="flex">
                <h2 className="p-5 font-semibold text-xl">Total landing pages: {pages.length}</h2>
                <Link to='/admin-dashboard/add-landing'><button className="btn btn-sm mt-5 btn-outline btn-success">Add New</button></Link>
            </div>
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead className="text-black font-bold">
                        <tr>
                            <th>No</th>
                            <th>Product name</th>
                            <th>image</th>
                            <th>Features</th>
                            <th>Regular Price</th>
                            <th>Discount Price</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* row 1 */}

                        {
                            pages.map((page, index) => <tr key={page._id}>
                                <td>{index + 1}</td>
                                <td>{page.productTitle}</td>
                                <td>
                                    <img src={page.productImage} alt="product image" className="w-32 h-32" />
                                </td>
                                <td>
                                    <p>{page.features1}</p>
                                    <p>{page.features2}</p>
                                    <p>{page.features3}</p>
                                    <p>{page.features4}</p>
                                    <p>{page.features5}</p>
                                </td>
                                <td>{page.productRegularPrice}</td>
                                <td>{page.productDiscountPrice}</td>
                                <td className="flex gap-2">
                                    <Link to={`/landing/product/${page._id}`}> <button className="p-2 rounded bg-blue-500 text-white border-none"> <IoIosEye /> </button></Link>
                                    <button onClick={() => hanldeLandingDelete(page._id)} className="p-2 rounded bg-red-500 text-white border-none"><FaTrash /></button>
                                </td>
                            </tr>)
                        }

                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default LandingPages;