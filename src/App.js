import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './Component/Home';
import ProductDetail from './Component/ProductDetail';
import NotFound from './Component/NotFound';
import Navbar from './Component/Navbar';
import { CartStateProvider } from './context/CartStateProvider';
import Cart from './Component/Cart';
function App() {
  return (
    <CartStateProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<Cart />} />

          {/* Catch-all route for 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </CartStateProvider>
  );
}

export default App;
