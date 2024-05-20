import { useLoaderData } from "react-router-dom";
import { updateProduct } from "../../../api/products";


const UpdateProduct = () => {


    const loadedSingleItem = useLoaderData();

    const { _id, productTitle, productRegularPrice, productImg, productDiscountPrice, productDescription } = loadedSingleItem;

    const handleUpdatedProduct = event => {
        event.preventDefault();
        const form = event.target;
        const productId = _id;
        const productTitle = form.title.value;
        const productRegularPrice = form.regular.value;
        const productDiscountPrice = form.discount.value;
        const productDescription = form.description.value;
        const updatedProductinfo = { productId, productTitle, productDescription, productRegularPrice, productDiscountPrice }

        //save product to db;

        updateProduct(updatedProductinfo)
        form.reset();

    }

    return (
        <div>
            <div className="min-h-screen">
                <div className="card shadow-2xl">
                    <form onSubmit={handleUpdatedProduct} className="card-body">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Product title</span>
                            </label>
                            <input type="text" defaultValue={productTitle} name='title' className="input input-bordered bg-white text-black" required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Description</span>
                            </label>
                            <textarea name="description" defaultValue={productDescription} className="textarea textarea-bordered textarea-lg min-h-screen bg-white text-wrap text-black" ></textarea>
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Regular Price</span>
                            </label>
                            <input type="number" name='regular' defaultValue={productRegularPrice} className="input input-bordered bg-white text-black" required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Discount Price</span>
                            </label>
                            <input type="number" name='discount' defaultValue={productDiscountPrice} className="input input-bordered bg-white text-black" />
                        </div>
                        <div className="form-control">
                            <label htmlFor="fileInput" className="label">
                                <span className="label-text bg-blue-500 text-white py-3 px-5 rounded">Update image</span>
                            </label>
                            <input type="file" name='image' id="fileInput" className="file-input file-input-bordered hidden file-input-accent bg-white" />
                            <img src={productImg} alt="" className="w-28 h-28" />
                        </div>
                        <div className="form-control mt-6">
                            <button className="btn btn-primary">Update Product</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default UpdateProduct;