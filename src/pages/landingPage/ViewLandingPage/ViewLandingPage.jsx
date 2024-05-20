import './viewlanding.css'
import Swal from 'sweetalert2';
import { useLoaderData } from 'react-router-dom';
import { FaHandPointRight } from "react-icons/fa6";
import { useContext, useState } from 'react';
import { AuthContext } from '../../../provider/AuthProvider';


const ViewLandingPage = () => {

    const { user } = useContext(AuthContext);
    const loadedlandingdata = useLoaderData();

    const { productTitle, productImage, productRegularPrice, productGallaries, productDiscountPrice, features1, features2, features3, features4, features5 } = loadedlandingdata;

    const [selectedArea, setselectedArea] = useState('insideDhaka');
    const [deliveryCharge, setDeliveryCharge] = useState(70);
    const [productPrice, setProductPrice] = useState(productDiscountPrice);

    const handleAreacChange = (event) => {
        const area = event.target.value;
        setselectedArea(area);
        // Update delivery charge based on selected country
        if (area === 'insideDhaka') {
            setDeliveryCharge(70);
        } else if (area === 'outsideDhaka') {
            setDeliveryCharge(130);
        }
    };

    const handleProductPriceChange = () => {
        const price = parseFloat(productDiscountPrice);
        setProductPrice(price);
    };

    const totalCost = productPrice + deliveryCharge;

    const handleCheckout = event => {
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
        const productTitle = document.getElementById('ptitle').innerText;
        const productImg = document.getElementById('pimage').src

        const CustomerInfo = { orderDate, CustomerName, email, productTitle, productImg, number, address, note, totalCost }

        console.log(CustomerInfo);


        fetch('http://localhost:5000/orders', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(CustomerInfo)
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
            <div>
                <>
                    <h2 className="text-3xl text-center bg-green-500 py-5 px-20 text-white md:w-3/5 mx-auto mt-10 leading-normal">{ productTitle}</h2>
                    <div className="flex items-center justify-evenly text-2xl text-black mt-5 mb-10">
                        <div>
                            <h2 className="my-5">বর্তমান মুল্য</h2>
                            <h2>পূর্বের মুল্য</h2>
                        </div>
                        <div>
                            <h2 className="my-5">{productDiscountPrice} টাকা</h2>
                            <h2 className='text-red-500 line-through'>{ productRegularPrice} টাকা</h2>
                        </div>
                    </div>
                    <div className="min-h-screen bg-[#C8F3E3] rounded-md md:w-3/5 mx-auto mt-10 pb-10">
                        <h2 className="text-3xl text-center leading-normal text-black pt-10">অর্ডার করতে নিচের ফর্মটি পূরণ করুন</h2>
                        <div className='bg-[#E6EEE5] my-10 mx-5'>
                            <div className="card shadow-xl">
                                <form onSubmit={handleCheckout} className="card-body text-black">
                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text">আপনার নাম *</span>
                                        </label>
                                        <input type="text" name='name' className="input input-bordered border-gray-500 bg-white" required />
                                    </div>
                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text">মোবাইল নাম্বার *</span>
                                        </label>
                                        <input type="text" name='number' className="input input-bordered border-gray-500 bg-white" required />
                                    </div>
                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text">আপনার ঠিকানা *</span>
                                        </label>
                                        <input type="text" name='address' className="input input-bordered border-gray-500 bg-white" required />
                                    </div>
                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text">শহর বাছাই করুন *</span>
                                        </label>
                                        <select value={selectedArea} onChange={handleAreacChange} className="select select-bordered w-full bg-white" required>
                                            <option value="insideDhaka">ঢাকার ভিতরে : ৭০টাকা</option>
                                            <option value="outsideDhaka">ঢাকার বাহিরে: ১৩০টাকা</option>
                                        </select>
                                    </div>
                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text">Order notes (optional)</span>
                                        </label>
                                        <input type="text" name='note' className="input input-bordered border-gray-500 h-20 bg-white" />
                                    </div>
                                    <div className='mt-10 bg-white rounded-md p-5 text-black'>
                                        <h2 className='text-2xl'>আপনার পণ্য</h2>
                                        <div className="overflow-x-auto">
                                            <table className="table">
                                                {/* head */}
                                                <thead className='text-black'>
                                                    <tr>
                                                        <th>Product</th>
                                                        <th>Quantity</th>
                                                        <th>Price</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <td>
                                                            <div className="flex items-center gap-3">
                                                                <div className="avatar">
                                                                    <div className="mask mask-squircle w-12 h-12">
                                                                        <img src={productImage} alt="Avatar Tailwind CSS Component" id='pimage' />
                                                                    </div>
                                                                </div>
                                                                <div>
                                                                    <div id='ptitle' className="font-bold">{ productTitle}</div>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <input type="number" min='1' defaultValue='1' className='input-sm bg-white border-2 rounded' />
                                                        </td>
                                                        <td id='total' value={productPrice} onChange={handleProductPriceChange}> { totalCost}৳ </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                    <div className='mt-10 bg-white rounded-md p-5 text-black'>
                                        <div className="font-bold inline-flex items-center gap-2">
                                            <h2>Cash on delivery </h2>
                                            <h2 className='bg-gray-500 text-white p-3 rounded'>পণ্য হাতে পেয়ে মুল্য পরিশোধ করুন</h2>
                                        </div>
                                    </div>
                                    <div className="form-control mt-6">
                                        <button className="btn btn-warning">অর্ডার কনফার্ম করুন</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                    <div className='w-3/4 mx-auto my-10'>
                        <div className='flex'>
                            {
                                productGallaries?.map((gallary, index) => <img key={index} src={gallary && gallary} alt="product image" className='mx-auto' />)
                            }
                        </div>
                        <div className='mt-10'>
                            <button className='bg-green-500 text-white py-4 text-xl uppercase font-bold rounded w-full'>Product Featured</button>
                            <div className='border-2 bg-[#C8F3E3] text-black font-serif text-xl py-3 px-5 mb-3 leading-normal'>
                                {
                                    features1 && <p className=''><FaHandPointRight className='inline'/> {features1}</p>
                                }
                                
                                {
                                    features2 && <p className=''><FaHandPointRight className='inline'/> {features2}</p>
                                }
                                
                                {
                                    features3 && <p className=''><FaHandPointRight className='inline'/> {features3}</p>
                                }
                                
                                {
                                    features4 && <p className=''><FaHandPointRight className='inline'/> {features4}</p>
                                }
                                
                                {
                                    features5 && <p className=''><FaHandPointRight className='inline'/> {features5}</p>
                                }
                                
                            </div>
                        </div>
                    </div>
                    <footer className="footer footer-center p-10 bg-primary text-white">
                        <aside>
                            <h2 className="font-bold">
                                ঠিকানা: 41/1 E Devidas Ghat lane, Chawkbazar, Dhaka, Dhaka, Bangladesh
                            </h2>
                            <h2 className="font-bold">
                                ফোন: 01750147774
                            </h2>
                            <h2 className="font-bold">
                                ইমেইল: truemartbangladesh@gmail.com
                            </h2>
                        </aside>
                    </footer>
                </>
            </div>
        </div>
    );
};

export default ViewLandingPage;