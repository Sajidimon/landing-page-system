import { useContext } from "react";
import { uploadImageToImgBB, uploadImagesToImgBB} from "../../../../api/images";
import { saveLandingData } from "../../../../api/landing";
import { AuthContext } from "../../../../provider/AuthProvider";


const AddLanding = () => {

    const { user } = useContext(AuthContext);

    const handleLanding = async (event) => {
        event.preventDefault();
        const form = event.target;
        const productTitle = form.title.value;
        const features1 = form.features1.value;
        const features2 = form.features2.value;
        const features3 = form.features3.value;
        const features4 = form.features4.value;
        const features5 = form.features5.value;
        const productRegularPrice = form.regular.value;
        const productDiscountPrice = form.discount.value;
        const email = user?.email

        //image upload to imgbb & save to db;

        //single image;
        const productImage = form.image.files[0];
        const productImageUrl = productImage ? await uploadImageToImgBB(productImage) : null ;

        //multiple images;
        const productGallaries = form.gallary.files
        const gallaryImagesUrl = await uploadImagesToImgBB(productGallaries)

        const landingProductInfo = {
            email,
            productTitle,
            features1,
            features2,
            features3,
            features4,
            features5,
            productRegularPrice,
            productDiscountPrice,
            productImage: productImageUrl,
            productGallaries: gallaryImagesUrl
            
        }

       await saveLandingData(landingProductInfo)
        form.reset();

    }

    return (
        <div>
            <div className="min-h-screen">
                <h2 className="text-center text-3xl font-bold mt-6 mb-10 text-black">Create your landing page</h2>
                <div className="card shadow-2xl text-black">
                    <form action="" onSubmit={handleLanding} className="card-body">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Product title</span>
                            </label>
                            <input type="text" name='title' className="input input-bordered border-blue-400 bg-white text-black" required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Product Features</span>
                            </label>
                            <input type="text" name='features1' className="input input-bordered border-blue-400 bg-white text-black" required />
                            <input type="text" name='features2' className="input mt-4 input-bordered border-blue-400 bg-white text-black" required />
                            <input type="text" name='features3' className="input my-4 input-bordered border-blue-400 bg-white text-black" />
                            <input type="text" name='features4' className="input input-bordered border-blue-400 bg-white text-black" />
                            <input type="text" name='features5' className="input mt-4 input-bordered border-blue-400 bg-white text-black" />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Regular Price</span>
                            </label>
                            <input type="number" name='regular' className="input input-bordered border-blue-400 bg-white text-black" required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Discount Price</span>
                            </label>
                            <input type="number" name='discount' className="input input-bordered border-blue-400 bg-white text-black" required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Product image</span>
                            </label>
                            <input type="file" name='image' className="file-input file-input-bordered border-blue-400 file-input-accent bg-white" required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Product Gallary</span>
                            </label>
                            <input type="file" name='gallary' className="file-input file-input-bordered border-blue-400 file-input-warning bg-white" multiple />
                        </div>
                        <div className="form-control mt-6">
                            <button className="btn btn-primary">Create Landing</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddLanding;