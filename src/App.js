import Nav from './Components/Nav.jsx';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Products from './Components/Products.jsx';
import AddProducts from './Components/AddProducts.jsx';
import Profile from './Components/Profile.jsx';
import Footer from './Components/Footer.jsx';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route path='/' element={<Products />} />
          <Route path='/add' element={<AddProducts />} />
          <Route path='/profile' element={<Profile />} />
        </Routes>
      </BrowserRouter>
      <Footer />
    </div>
  );
}

export default App;
