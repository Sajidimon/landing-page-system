import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import AdminDashboard from './pages/dashboard/dashboard/AdminDashboard.jsx'
import AllOrders from './pages/dashboard/orders/AllOrders.jsx'
import Products from './pages/dashboard/products/Products.jsx'
import AddProduct from './pages/dashboard/products/AddProduct.jsx'
import Login from './pages/login/Login.jsx'
import Register from './pages/register/Register.jsx'
import AuthProvider from './provider/AuthProvider.jsx'
import UpdateProduct from './pages/dashboard/products/UpdateProduct.jsx'
import ProductsProvider from './provider/ProductsProvider.jsx'
import PrivateRoute from './route/PrivateRoute.jsx'
import UpdateOrder from './pages/dashboard/orders/UpdateOrder.jsx'
import ViewLandingPage from './pages/landingPage/ViewLandingPage/ViewLandingPage.jsx'
import Home from './pages/home/Home.jsx'
import ProductItem from './layouts/productItem/ProductItem.jsx'
import AdminHome from './pages/dashboard/dashboard/AdminHome.jsx'
import Checkout from './pages/checkout/Checkout.jsx'
import LandingPages from './pages/dashboard/landingPages/allLanding/LandingPages.jsx'
import AddLanding from './pages/dashboard/landingPages/addLanding/AddLanding.jsx'
import MakeAdmin from './layouts/makeadmin/MakeAdmin.jsx'
import Users from './pages/dashboard/Users/Alluser/Users.jsx'



const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />
  },
  {
    path: '/landing/product/:title',
    element: <ViewLandingPage />,
    loader: ({ params }) => fetch(`${import.meta.env.VITE_API_URL}/landing/product/${params.title}`)
  },
  {
    path: '/admin-dashboard',
    element: <PrivateRoute><AdminDashboard /></PrivateRoute>,
    children: [
      {
        path: 'home',
        element: <AdminHome />
      },
      {
        path: 'orders',
        element: <AllOrders />
      },
      {
        path: 'update-orders/:id',
        element: <UpdateOrder />,
        loader: ({ params }) => fetch(`${import.meta.env.VITE_API_URL}/orders/${params.id}`)
      },
      {
        path: 'products',
        element: <Products />
      },
      {
        path: 'add-product',
        element: <AddProduct />
      },
      {
        path: 'update-product/:id',
        element: <UpdateProduct />,
        loader: ({ params }) => fetch(`${import.meta.env.VITE_API_URL}/products/${params.id}`)
      },
      {
        path: 'all-landing',
        element: <LandingPages />
      },
      {
        path: 'add-landing',
        element: <AddLanding />
      },
      {
        path: 'addUser',
        element: <MakeAdmin />
      },
      {
        path: 'users',
        element: <Users />,
        loader: () => fetch(`${import.meta.env.VITE_API_URL}/users`)
      }
    ]
  },
  {
    path: '/admin-login',
    element: <Login />
  },
  {
    path: '/admin-register',
    element: <Register />
  },
  {
    path: '/products/item/:title',
    element: <ProductItem />,
    loader: ({ params }) => fetch(`${import.meta.env.VITE_API_URL}/products/item/${params.title}`)
  },
  {
    path: '/checkout/:id',
    element: <Checkout />,
    loader: ({ params }) => fetch(`${import.meta.env.VITE_API_URL}/products/${params.id}`)
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <ProductsProvider>
        <RouterProvider router={router} />
      </ProductsProvider>
    </AuthProvider>
  </React.StrictMode>,
)
