import Nav from './Components/Nav/Nav.jsx';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Products from './Components/Products/Products.jsx';
import AddProducts from './Components/AddProduct/AddProducts.jsx';
import Profile from './Components/Profile/Profile.jsx';
import Footer from './Components/Footer/Footer.jsx';
import SignUp from './Components/SignUp/SignUp.jsx';
import './index.css';
import PrivateComp from './Components/PrivateComp.jsx';
import Login from './Components/Login/Login.jsx';
import UpdateProduct from './Components/UpdateProduct/UpdateProduct.jsx';
import './responsive.css';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route element={<PrivateComp />}>
            <Route path='/' element={<Products />} />
            <Route path='/addProducts' element={<AddProducts />} />
            <Route path='/profile' element={<Profile />} />
            <Route path='/update/:id' element={<UpdateProduct />} />
          </Route>
          <Route path='/signUp' element={<SignUp />} />
          <Route path='/login' element={<Login />} />
        </Routes>
      </BrowserRouter>
      <Footer />
    </div>
  );
}

export default App;
