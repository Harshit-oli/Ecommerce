import { BrowserRouter,Routes,Route} from 'react-router-dom'
import UserLayout from './components/Layout/UserLayout'
import Home from './pages/Home'
import {Toaster} from "sonner"
import Login from './pages/Login'
import Register from './pages/Register'
import Profile from './pages/Profile'
import CollectionPage from './pages/CollectionPage'
import ProductsDetails from './components/Products/ProductsDetails'
import Checkout from './components/Cart/Checkout'
import OrderConfirmationPage from './pages/OrderConfirmationPage'
import OrderDetailsPage from './pages/OrderDetailsPage'
import MyOrdersPage from './pages/MyOrdersPage'
import AdminLayout from './components/Admin/AdminLayout'
import AdminHomePage from './pages/AdminHomePage'
import UserManagement from './components/Admin/UserManagement'
import ProductManagement from './components/Admin/ProductManagement'
import EditProductPage from './components/Admin/EditProductPage'
import OrderManagement from './components/Admin/OrderManagement'

const App = () => {
  return (
   <BrowserRouter>
   <Toaster position='top-right'/>
   <Routes>
    <Route path="/" element={<UserLayout/>}>
    <Route index element={<Home/>}/>
    <Route path="login" element={<Login/>}/>
     <Route path="register" element={<Register/>}/>
     <Route path="profile" element={<Profile/>}/>
     <Route path='collections/:collection' element={<CollectionPage/>}/>
     <Route path='product/:id' element={<ProductsDetails/>}></Route>
     <Route path='checkout' element={<Checkout/>}></Route>
     <Route path='order-confirmation' element={<OrderConfirmationPage/>}></Route>
     <Route path="order/:id" element={<OrderDetailsPage/>}></Route>
     <Route path='my-orders' element={<MyOrdersPage/>}></Route>
    </Route> 
    <Route path='/admin' element={<AdminLayout/>}>
    <Route index element={<AdminHomePage/>}></Route>
    <Route path="users" element={<UserManagement/>}></Route>
    <Route path='products' element={<ProductManagement/>}></Route>
    <Route path='products/:id/edit' element={<EditProductPage/>}></Route>
    <Route path='orders' element={<OrderManagement/>}></Route>
    </Route>

   </Routes>
   </BrowserRouter>
  )
}

export default App
