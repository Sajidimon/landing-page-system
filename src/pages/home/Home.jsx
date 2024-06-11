import Banner from "../../layouts/Banner/Banner";
import Footer from "../../shared/footer/Footer";
import Navigation from "../../shared/navigation/Navigation";
import PaginationProducts from "../allProducts/PaginationWiseProduct/PaginationProducts";


const Home = () => {
    
    return (
        <div>
            <Navigation />
            <Banner />
            <div>
                <h2 className="uppercase font-bold text-4xl text-center text-black my-10">All Product</h2>
            </div>
            <PaginationProducts />
            <Footer/>
        </div>
    );
};

export default Home;