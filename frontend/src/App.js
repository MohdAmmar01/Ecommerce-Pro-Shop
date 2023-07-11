import './App.css';
import Home from './screens/Home';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import Product from './screens/Product';
import Error from './screens/Error';
import Register from './screens/Register';
import Login from './screens/Login';
import axios from 'axios';
import Profile from './screens/Profile';
import { useSelector } from 'react-redux';
import Cart from './screens/Cart';
import Shipping from './screens/Shipping';
import PlaceOrder from './screens/PlaceOrder';
import Order from './screens/Order';
import Admin from './screens/Admin';
import Allusers from './screens/Allusers';
import Allproducts from './screens/Allproducts';
import Allorders from './screens/Allorders';
import Createproduct from './screens/Createproduct';
import EditProduct from './screens/EditProduct';
import Search from './screens/Search';
import Verify from './screens/Verify';
axios.defaults.withCredentials = true;
function App() {
  const {users,cart}=useSelector((state)=>{return state})
  return (
  <>
  <BrowserRouter>
    <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/search/:id" element={<Search />} />
          <Route exact  path="/product/:id" element={<Product />} />
          <Route exact  path="/login" element={<Login />} />
          <Route exact  path="/register" element={<Register />} />
          <Route exact  path="/verify/:id" element={<Verify />} />
        { users.isloggedin===true? <Route exact  path="/myprofile" element={<Profile />} />:null}
          <Route exact path="/cart" element={<Cart/>} />
          {cart.price!==null?<Route exact path="/shipping" element={<Shipping/>} />:null}
         {cart.price!==null && cart.shippingaddress.address!==null? <Route exact path="/placeorder" element={<PlaceOrder/>} />:null}
         {users.isloggedin===true?<Route exact  path="/order/:id" element={<Order />} />:null}
         {users.isloggedin===true && users.userdata.isAdmin===true?<Route exact  path="/admin" element={<Admin />} />:null}
         {users.isloggedin===true && users.userdata.isAdmin===true?<Route exact  path="/admin/allusers" element={<Allusers />} />:null}
         {users.isloggedin===true && users.userdata.isAdmin===true?<Route exact  path="/admin/allproducts" element={<Allproducts />} />:null}
         {users.isloggedin===true && users.userdata.isAdmin===true?<Route exact  path="/admin/allorders" element={<Allorders />} />:null}
         {users.isloggedin===true && users.userdata.isAdmin===true?<Route exact  path="/admin/editproduct/:id" element={<EditProduct />} />:null}
         {users.isloggedin===true && users.userdata.isAdmin===true?<Route exact  path="/admin/createproduct" element={<Createproduct />} />:null}
          <Route exact path="*" element={<Error/>} />
        </Routes>
        </BrowserRouter>
  </>
  );
}

export default App;
