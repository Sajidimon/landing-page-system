import Swal from 'sweetalert2';
import { FiShoppingCart } from 'react-icons/fi';
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {

    const { _id, productTitle, productImg, productDiscountPrice, productRegularPrice } = product;

    return (
        <div>
            <div className="card shadow-xl text-black   ">
                <figure className="px-10 pt-10">
                    <Link to={`/products/item/${product.productTitle}`}><img src={productImg} alt="Shoes" className="rounded-xl h-40 w-40" /></Link>
                </figure>
                <div className="card-body items-center text-center">
                    <h2 className="">{productTitle}</h2>
                    <p>Price: {productRegularPrice? productRegularPrice: productDiscountPrice}</p>
                    <div className="card-actions">
                        <Link to={`checkout/${product._id}`}><button className="btn btn-warning text-black"><FiShoppingCart /> Order Now</button></Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;