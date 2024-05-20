import { useLoaderData } from "react-router-dom";


const UpdateOrder = () => {


    const loadedUpdatedOrder = useLoaderData();

    console.log(loadedUpdatedOrder);

    const { CustomerName, number, address, orderDate, totalCost } = loadedUpdatedOrder;

    return (
        <div>
            <div className="min-h-screen">
                <h2 className="text-center my-10 text-2xl text-black">Customer Order details</h2>
                <div className="card shadow">
                    <form className="card-body">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Customer name</span>
                            </label>
                            <input type="text" defaultValue={CustomerName} name='title' className="input input-bordered bg-white text-black" required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Mobile number</span>
                            </label>
                            <input type="text" defaultValue={number} name='title' className="input input-bordered bg-white text-black" required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Address</span>
                            </label>
                            <input type="text" defaultValue={address} name='title' className="input input-bordered bg-white text-black" required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Order date</span>
                            </label>
                            <input type="text" defaultValue={orderDate} name='discount' className="input input-bordered bg-white text-black" required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Total</span>
                            </label>
                            <input type="text" defaultValue={totalCost} name='discount' className="input input-bordered bg-white text-black" required />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default UpdateOrder;