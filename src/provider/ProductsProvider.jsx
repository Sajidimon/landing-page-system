import { createContext, useEffect, useState } from "react";
import useAuth from "../hook/useAuth/useAuth";


export const ProductsContext = createContext(null);

const ProductsProvider = ({ children }) => {

    const { user } = useAuth();
    const [users, setUsers] = useState([])
    const [products, setProducts] = useState([])

    //user management;

    useEffect(() => {
        if (user?.email) {
            fetch(`${import.meta.env.VITE_API_URL}/users?email=${user.email}`)
                .then(res => res.json())
                .then(data => {
                    setUsers(data)
                })
        }
    }, [user?.email])


    //show all products;

    useEffect(() => {
        if (user?.email) {
            fetch(`${import.meta.env.VITE_API_URL}/products?email=${user?.email}`, {
                headers: {
                    'content-type': 'application/json',
                    authorization: `bearer ${localStorage.getItem('access-token')}`
                }
            })
                .then(res => res.json())
                .then(data => {
                    setProducts(data)
                })
        }
    }, [user?.email])




    const productInfo = {
        products,
        users
    }

    return (
        <ProductsContext.Provider value={productInfo}>
            {children}
        </ProductsContext.Provider>
    );
};

export default ProductsProvider;