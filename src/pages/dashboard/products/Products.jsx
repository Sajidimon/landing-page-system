import { FaEdit, FaTrash } from "react-icons/fa";
import { IoIosEye } from "react-icons/io";
import { Link } from "react-router-dom";
import { deleteProduct } from "../../../api/products";
import { useContext, useEffect, useState } from "react";
import { ProductsContext } from "../../../provider/ProductsProvider";
import useAuth from "../../../hook/useAuth/useAuth";


const Products = () => {

    const { loading } = useAuth();
    const { products } = useContext(ProductsContext)

    const [allproducts, setAllproducts] = useState([])

    useEffect(() => {
        if (products.length > 0) {
            setAllproducts(products);
        }
    }, [products]);

    if (loading) {
        return <span className="loading mx-auto block mt-40 loading-dots loading-lg"></span>;
    }

    //delete single product via id;

    const handleProductDelete = id => {
        deleteProduct(id).then(() => {
            setAllproducts(products.filter(item => item._id !== id))
        }).catch(error=>console.log(error))
    }

    return (
        <div className="bg-[#F0F0F1] text-black ">
            {
                Array.isArray(allproducts) ? <>
                
                    <div className="flex">
                        <h2 className="p-5 font-semibold text-xl">All Product: {allproducts.length}</h2>
                        <Link to='/admin-dashboard/add-product'><button className="btn btn-sm mt-5 btn-outline btn-success">Add New</button></Link>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="table">
                            {/* head */}
                            <thead className="text-black font-bold">
                                <tr>
                                    <th>No</th>
                                    <th>Product name</th>
                                    <th>Description</th>
                                    <th>Regular Price</th>
                                    <th>Discount Price</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {/* row 1 */}

                                {
                                    allproducts.map((product, index) => <tr key={product._id}>
                                        <td>{index + 1}</td>
                                        <td>{product.productTitle}</td>
                                        <td>{product.productDescription.slice(0, 90)}</td>
                                        <td>{product.productRegularPrice}</td>
                                        <td>{product.productDiscountPrice}</td>
                                        <td className="flex gap-2">
                                            <Link to={`/products/item/${product.productTitle}`}> <button className="p-2 rounded bg-blue-500 text-white border-none"> <IoIosEye /> </button></Link>
                                            <Link to={`/admin-dashboard/update-product/${product._id}`}> <button className="p-2 rounded bg-green-500 text-white border-none"><FaEdit /> </button></Link>
                                            <button onClick={() => handleProductDelete(product._id)} className="p-2 rounded bg-red-500 text-white border-none"><FaTrash /></button>
                                        </td>
                                    </tr>)
                                }

                            </tbody>
                        </table>
                    </div>
                
                </> : <p>no product found</p>
            }
        </div>
    );
};

export default Products;