import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import Layout from './components/layout/Layout';
import Home from './components/views/Home';
import ItemListContainer from './components/layout/ItemListContainer';
import ItemDetailContainer from './components/views/ItemDetailContainer';
import Cart from './components/views/Cart';

function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <Layout>
          <Routes>
            {/* Ahora la ruta principal carga el Inicio */}
            <Route path="/" element={<Home />} />
            {/* El catálogo de ropa se mudó a /productos */}
            <Route path="/productos" element={<ItemListContainer />} />
            <Route path="/producto/:id" element={<ItemDetailContainer />} />
            <Route path="/carrito" element={<Cart />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;