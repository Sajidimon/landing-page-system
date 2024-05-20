import { useContext } from "react";
import { ProductsContext } from "../../../provider/ProductsProvider";
import ProductCard from "../productCard/ProductCard";

const PaginationProducts = () => {

    const { products } = useContext(ProductsContext);

    return (
        <div className="grid md:grid-cols-4 md:gap-4">
            {
                products.map(product => <ProductCard key={product._id} product={ product} />)
            }
           
        </div>
    );
};

export default PaginationProducts;