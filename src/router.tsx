import { createBrowserRouter } from 'react-router-dom'
import Layout from './layouts/Layout'
import Products, { loader as productsLoader, action as availabilityAction } from './views/Products'
import NewProduct, { action as newProductAction } from './views/NewProduct'
import EditProduct, { loader as editProductLoader, action as editProductAction}  from './views/EditProduct'
import { action as deleteProductAction } from './components/ProductDetails'



export const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        children: [
            {
                element: <Products />,
                index: true,
                loader: productsLoader,
                action: availabilityAction
            },
            {
                path: 'productos/nuevo', 
                element: <NewProduct />,
                action: newProductAction        
            },
            {
                path: 'productos/:productId/editar', 
                element: <EditProduct />,                   
                loader: editProductLoader,
                action: editProductAction
            },
            {
                path: 'productos/:productId/eliminar',
                action: deleteProductAction
            }
        ]
    }
]

)