import { useLoaderData } from "react-router-dom";
import Navigation from "../../shared/navigation/Navigation";

const ProductItem = () => {

    const singleProduct = useLoaderData();

    const { productTitle, productImg, productRegularPrice, productDescription } = singleProduct;

    return (
        <div>
            <Navigation/>
            <div className="md:flex mt-10">
                <div className="md:w-2/5 mx-10">
                    <img src={productImg} alt=""/>
                </div>
                <div className="md:w-3/5 mx-5">
                    <h2 className="text-3xl text-black font-bold">{ productTitle}</h2>
                    <p className="my-5 font-bold text-xl text-black">Price: { productRegularPrice} tk</p>
                    <div className="flex gap-2">
                        <button className="btn btn-primary rounded-md">Buy now</button>
                    </div>
                    <h2 className="mt-10 mb-5 text-4xl text-black">Description</h2>
                    <p className="text-black font-sans">{ productDescription}</p>
                </div>
            </div>
            <div className="my-20 mx-10">
                <h2 className="mb-10 text-4xl text-black">You may like</h2>
                <div className="grid md:grid-cols-4 gap-5">
                    <div className="card card-compact shadow-xl">
                        <figure><img src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg" alt="Shoes" /></figure>
                        <div className="card-body text-center text-black">
                            <h2 className="text-xl">Shoes!</h2>
                            <p>If a dog chews shoes whose shoes does he choose?</p>
                            <div className="card-actions justify-center">
                                <button className="btn btn-outline btn-warning">Buy Now</button>
                            </div>
                        </div>
                    </div>
                    <div className="card card-compact shadow-xl">
                        <figure><img src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg" alt="Shoes" /></figure>
                        <div className="card-body text-center text-black">
                            <h2 className="text-xl">Shoes!</h2>
                            <p>If a dog chews shoes whose shoes does he choose?</p>
                            <div className="card-actions justify-center">
                                <button className="btn btn-outline btn-warning">Buy Now</button>
                            </div>
                        </div>
                    </div>
                    <div className="card card-compact shadow-xl">
                        <figure><img src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg" alt="Shoes" /></figure>
                        <div className="card-body text-center text-black">
                            <h2 className="text-xl">Shoes!</h2>
                            <p>If a dog chews shoes whose shoes does he choose?</p>
                            <div className="card-actions justify-center">
                                <button className="btn btn-outline btn-warning">Buy Now</button>
                            </div>
                        </div>
                    </div>
                    <div className="card card-compact shadow-xl">
                        <figure><img src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg" alt="Shoes" /></figure>
                        <div className="card-body text-center text-black">
                            <h2 className="text-xl">Shoes!</h2>
                            <p>If a dog chews shoes whose shoes does he choose?</p>
                            <div className="card-actions justify-center">
                                <button className="btn btn-outline btn-warning">Buy Now</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductItem;