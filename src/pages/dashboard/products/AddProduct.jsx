import { useContext } from "react";
import { saveProducts } from "../../../api/products";
import { AuthContext } from "../../../provider/AuthProvider";


const AddProduct = () => {

    const {user}  = useContext(AuthContext)

    const handleaddProduct = event => {
        event.preventDefault();
        const form = event.target;
        const productTitle = form.title.value;
        const productRegularPrice = form.regular.value;
        const productDiscountPrice = form.discount.value;
        const productDescription = form.description.value;
        const productCategory = form.category.value;
        const email = user.email;

        //image upload & save data to db;

        const productImage = form.image.files[0];
        const formData = new FormData();
        formData.append('image', productImage)

        const url = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMBB_SECRET_API}`

        fetch(url, {
            method: 'POST',
            body: formData
        }).then(res => res.json())
            .then(imageData => {
                const productImg = imageData.data.display_url;

                const productinfo = { email, productTitle, productCategory, productDescription, productImg, productRegularPrice, productDiscountPrice }

                console.log(productinfo);

                //save product to db;

                saveProducts(productinfo)
                form.reset();

            }).catch(error => console.log(error))

    }

    return (
        <div>
            <div className="min-h-screen">
                <div className="card shadow-2xl">
                    <form action="" onSubmit={handleaddProduct} className="card-body">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Product title</span>
                            </label>
                            <input type="text" name='title' className="input input-bordered bg-white text-black" required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Category</span>
                            </label>
                            <input type="text" name='category' className="input input-bordered bg-white text-black" required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Description</span>
                            </label>
                            <textarea name="description" className="textarea textarea-bordered textarea-lg min-h-screen bg-white text-wrap text-black" ></textarea>
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Regular Price</span>
                            </label>
                            <input type="number" name='regular' className="input input-bordered bg-white text-black" required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Discount Price</span>
                            </label>
                            <input type="number" name='discount' className="input input-bordered bg-white text-black" />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Product image</span>
                            </label>
                            <input type="file" name='image' className="file-input file-input-bordered file-input-accent bg-white" />
                        </div>
                        <div className="form-control mt-6">
                            <button className="btn btn-primary">Add Product</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddProduct;