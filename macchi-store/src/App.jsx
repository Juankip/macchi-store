import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import Layout from './components/layout/Layout';
import Home from "./components/views/Inicio.jsx";
import ItemListContainer from './components/layout/ItemListContainer';
import ItemDetailContainer from './components/views/ItemDetailContainer';
import Cart from './components/views/Cart';
import Checkout from "./components/views/FinalizarCompra.jsx"; // Usamos este

function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/productos" element={<ItemListContainer />} />
            <Route path="/categoria/:categoriaId" element={<ItemListContainer />} />
            <Route path="/producto/:id" element={<ItemDetailContainer />} />
            <Route path="/carrito" element={<Cart />} />
            
            {/* Ruta única para finalizar compra */}
            <Route path="/checkout" element={<Checkout />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;