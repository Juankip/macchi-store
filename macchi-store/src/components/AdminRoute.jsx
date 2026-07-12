import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/auth-context';

const AdminRoute = ({ children }) => {
  const { user, loading, isAdmin } = useContext(AuthContext);

  if (loading) return <div>Cargando...</div>;
  if (!user) return <Navigate to="/login" replace />;
  if (!isAdmin) return <Navigate to="/" replace />;

  return children;
};

export default AdminRoute;
