import { useContext, useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa";
import { FaEye } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../provider/AuthProvider";


const AllOrders = () => {


    const { user, loading } = useContext(AuthContext)
    const [allorders, setAllorders] = useState([])


    //get orders of admin;

    useEffect(() => {
        if (user?.email) {
            fetch(`http://localhost:5000/orders?email=${user?.email}`)
                .then(res => res.json())
                .then(data => {
                    setAllorders(data)
                })
        }
    }, [user?.email])

    if (loading) {
        return <span className="loading mx-auto block mt-40 loading-dots loading-lg"></span>;
    }

    // delete order from db;

    const handleorderDelete = id => {
        fetch(`http://localhost:5000/orders/${id}`, {
            method: 'DELETE'
        })
            .then(res => res.json())
            .then(data => {
                const remaining = orders.filter(item => item._id !== id)
                setAllorders(remaining)
                console.log(data);
            })

    }

    return (
        <div className="bg-[#F0F0F1] text-black rounded">
            <h2 className="p-5 font-semibold text-xl">All Order: {allorders.length}</h2>
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead className="text-black font-bold">
                        <tr>
                            <th>Serial</th>
                            <th>Order</th>
                            <th>Date</th>
                            <th>Total</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>

                        {
                            allorders.map((order, index) => <tr key={order._id}>
                                <th>{index + 1}</th>
                                <td>{order.CustomerName}</td>
                                <td>{order.orderDate}</td>
                                <td>{order.totalCost}</td>
                                <td className="flex gap-2">
                                    <Link to={`/admin-dashboard/update-orders/${order._id}`}> <button className="p-2 rounded bg-green-500 text-white border-none"><FaEye /> </button></Link>
                                    <button onClick={() => handleorderDelete(order._id)} className="p-2 rounded bg-red-500 text-white border-none"><FaTrash /></button>
                                </td>
                            </tr>)
                        }

                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AllOrders;