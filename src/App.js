import Nav from './Components/Nav.jsx';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Products from './Components/Products.jsx';
import AddProducts from './Components/AddProducts.jsx';
import Profile from './Components/Profile.jsx';
import Footer from './Components/Footer.jsx';
import SignUp from './Components/SignUp.jsx';
import './index.css';
import PrivateComp from './Components/PrivateComp.jsx';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route element={<PrivateComp />}>
            <Route path='/' element={<Products />} />
            <Route path='/add' element={<AddProducts />} />
            <Route path='/profile' element={<Profile />} />
          </Route>
            <Route path='/signUp' element={<SignUp />} />
        </Routes>
      </BrowserRouter>
      <Footer />
    </div>
  );
}

export default App;
