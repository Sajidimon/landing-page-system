import { FaEye, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import useAuth from "../../../../hook/useAuth/useAuth";
import { useContext } from "react";
import { ProductsContext } from "../../../../provider/ProductsProvider";


const Users = () => {

    const { loading } = useAuth();
    const {users} = useContext(ProductsContext)


    if (loading) {
        return <span className="loading mx-auto block mt-40 loading-dots loading-lg"></span>;
    }

    return (
        <div className="bg-[#F0F0F1] text-black rounded">
            {
                Array.isArray(users) ? <>
                
                    <div className="flex">
                        <h2 className="p-5 font-semibold text-xl">All user: {users?.length}</h2>
                        <Link to='/admin-dashboard/addUser'><button className="btn btn-sm mt-5 btn-outline btn-success">Add New</button></Link>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="table">
                            {/* head */}
                            <thead className="text-black font-bold">
                                <tr>
                                    <th>Serial</th>
                                    <th>Email</th>
                                    <th>Role</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>

                                {
                                    users?.map((user, index) => <tr key={user._id}>
                                        <th>{index + 1}</th>
                                        <td>{user.email}</td>
                                        <td>{user.user.role}</td>
                                        <td className="flex gap-2">
                                            <Link to=''> <button className="p-2 rounded bg-green-500 text-white border-none"><FaEye /> </button></Link>
                                            <button className="p-2 rounded bg-red-500 text-white border-none"><FaTrash /></button>
                                        </td>
                                    </tr>)
                                }

                            </tbody>
                        </table>
                    </div>
                
                </> : <p>no user found</p>
           }
        </div>
    );
};

export default Users;