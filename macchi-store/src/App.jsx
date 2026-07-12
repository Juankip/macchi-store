import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from "./components/ProtectedRoute";
import Layout from "./components/layout/Layout";
import Inicio from "./components/views/Inicio";
import Cart from "./components/views/Cart";
import Checkout from "./components/layout/Checkout";
import ItemListContainer from "./components/layout/ItemListContainer";
import ItemDetailContainer from "./components/views/ItemDetailContainer";
import Login from "./components/views/Login";
import Register from "./components/views/Register";
import Perfil from "./components/views/Perfil";
import ProductAdmin from "./components/admin/ProductAdmin";
import CouponAdmin from "./components/admin/CouponAdmin";
import AdminRoute from "./components/AdminRoute";

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <BrowserRouter>
          <Layout>
            <Routes>
              <Route path="/" element={<Inicio />} />
            <Route path="/productos" element={<ItemListContainer />} />
            <Route path="/categoria/:categoriaId" element={<ItemListContainer />} />
            <Route path="/item/:id" element={<ItemDetailContainer />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/perfil" element={
              <ProtectedRoute>
                <Perfil />
              </ProtectedRoute>
            } />
            <Route path="/admin" element={
              <AdminRoute>
                <ProductAdmin />
              </AdminRoute>
            } />
            <Route path="/admin/cupones" element={
              <AdminRoute>
                <CouponAdmin />
              </AdminRoute>
            } />
          </Routes>
          </Layout>
        </BrowserRouter>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;