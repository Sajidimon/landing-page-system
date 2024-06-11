import { useLoaderData } from "react-router-dom";
import Navigation from "../../shared/navigation/Navigation";
import Swal from "sweetalert2";
import { useContext } from "react";
import { AuthContext } from "../../provider/AuthProvider";


const Checkout = () => {

    const { user } = useContext(AuthContext);
    const checkoutItem = useLoaderData();

    const { productTitle, productImg, productDiscountPrice, productRegularPrice, totalCost } = checkoutItem;

    const handleCheckoutForm = event => {
        event.preventDefault();


        const orderDate = new Date().toLocaleDateString('en-US', {
            month: 'long',
            day: 'numeric',
            year: 'numeric'
        });

        const form = event.target;
        const CustomerName = form.name.value;
        const email = user?.email;
        const number = form.number.value;
        const address = form.address.value;
        const note = form.note.value;

        const orderInfo = { orderDate, CustomerName, email, productTitle, productImg, number, address, note, totalCost }

        console.log(orderInfo);

        fetch(`${import.meta.env.VITE_API_URL}/orders`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(orderInfo)
        }).then(res => res.json())
            .then(data => {
                if (data.insertedId) {
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: "Your order has been successful",
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
                console.log(data);
                form.reset();
            })

    }

    return (
        <div>
            <Navigation />
            <div className="min-h-screen bg-[#C8F3E3] rounded-md w-3/5 mx-auto mt-10 pb-5 mb-10">
                <h2 className="text-3xl text-center text-black pt-10">অর্ডার করতে নিচের ফর্মটি পূরণ করুন</h2>
                <div className='bg-[#E6EEE5] my-10 mx-10'>
                    <div className="card shadow-2xl">
                        <form onSubmit={handleCheckoutForm} className="card-body text-black">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">আপনার নাম *</span>
                                </label>
                                <input type="text" name='name' className="input input-bordered bg-white" required />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">মোবাইল নাম্বার *</span>
                                </label>
                                <input type="text" name='number' className="input input-bordered bg-white" required />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">আপনার ঠিকানা *</span>
                                </label>
                                <input type="text" name='address' className="input input-bordered bg-white" required />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Order notes (optional)</span>
                                </label>
                                <input type="text" name='note' className="input input-bordered h-20 bg-white" />
                            </div>
                            <div className='mt-10 bg-white rounded-md p-5 text-black'>
                                <h2 className='text-2xl'>আপনার পণ্য</h2>
                                <div className="overflow-x-auto">
                                    <table className="table">
                                        <thead className='text-black'>
                                            <tr>
                                                <th>Product</th>
                                                <th>Quantity</th>
                                                <th>Price</th>
                                            </tr>
                                        </thead>
                                        <tbody> <tr> <td>
                                            <div className="flex items-center gap-3">
                                                <div className="avatar">
                                                    <div className="mask mask-squircle w-12 h-12">
                                                        <img src={productImg} alt="Avatar Tailwind CSS Component" id='pimage' />
                                                    </div>
                                                </div>
                                                <div>
                                                    <div id='ptitle' className="font-bold">{productTitle}</div>
                                                </div>
                                            </div>
                                        </td>
                                            <td>
                                                <input type="number" min='1' defaultValue='1' className='input-sm bg-white border-2 rounded' />
                                            </td>
                                            <td id='total'>{productDiscountPrice ? productDiscountPrice : productRegularPrice} ৳ </td>
                                        </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <div className='mt-10 bg-white rounded-md p-5 text-black'>
                                <div className="tooltip tooltip-open tooltip-right font-bold" data-tip="পণ্য হাতে পেয়ে মুল্য পরিশোধ করুন">
                                    <h2>Cash on delivery</h2>
                                </div>
                            </div>
                            <div className="form-control mt-6">
                                <button className="btn btn-warning">অর্ডার কনফার্ম করুন</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Checkout;