import { useContext } from "react";
import { ProductsContext } from "../../../provider/ProductsProvider";
import useAuth from "../../../hook/useAuth/useAuth";


const AdminHome = () => {

    const { products } = useContext(ProductsContext)
    const { user } = useAuth();
    return (
        <div className="">
            {
                Array.isArray(products) && products.length > 0 ? <>
                
                    <div className="grid md:grid-cols-3 gap-5">
                        <div className="bg-[#F0F0F1] shadow p-10 text-center text-blue-500">
                            <p className="text-xl">  Total Product</p>
                            <h2 className="font-bold text-2xl">{products?.length}</h2>
                        </div>
                        <h2 className="mt-10 text-xl text-black">Hi {user.email}</h2>
                    </div>

                    <div className="overflow-x-auto shadow px-10 pb-10 my-10 bg-[#F0F0F1]">
                        <h2 className="text-black text-2xl mt-5 mb-10">Last 5 Product</h2>
                        <table className="table">
                            <thead className="text-xl bg-blue-700 text-white rounded">
                                <tr>
                                    <th>Product Name</th>
                                    <th>Category</th>
                                    <th>Price</th>
                                    <th>Product</th>
                                </tr>
                            </thead>
                            <tbody className="text-black text-base">

                                {
                                    products.map(product => <tr key={product._id}>

                                        <td>
                                            {product.productTitle}
                                        </td>
                                        <td>{product.productCategory}</td>
                                        <td> {product.productRegularPrice ? product.productRegularPrice : product.productDiscountPrice} টাকা</td>
                                        <td>
                                            <div className="flex items-center gap-3">
                                                <div className="avatar">
                                                    <div className="mask mask-squircle w-12 h-12">
                                                        <img src={product.productImg} alt="Avatar Tailwind CSS Component" />
                                                    </div>
                                                </div>
                                                <div>
                                                    <div className="font-bold"></div>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>)
                                }

                            </tbody>
                        </table>
                    </div>
                
                
                </> : <p>no products found</p>
            }
        </div>
    );
};

export default AdminHome;