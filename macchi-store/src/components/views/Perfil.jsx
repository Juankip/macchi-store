import { useContext } from 'react';
import { AuthContext } from '../../context/auth-context';
import { Container, Card, Button } from 'react-bootstrap';
import { FaUserCircle, FaSignOutAlt } from 'react-icons/fa';
import styled from 'styled-components';
import SEO from '../common/SEO';

const ProfileCard = styled(Card)`
  background-color: #181818;
  border: 1px solid #282828;
  border-radius: 1rem;
  color: #eee;
  padding: 2rem;
`;

const Perfil = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <Container fluid className="px-0 px-md-3">
      <SEO title="Perfil de usuario | Gen Rockero" description="Accedé a tu perfil para gestionar tu cuenta y compras." />
      <ProfileCard className="mt-4 mx-auto" style={{ maxWidth: '560px', textAlign: 'center' }}>
        <div style={{ marginBottom: '1.5rem' }}>
          <FaUserCircle size={56} style={{ color: '#c1121f' }} />
        </div>
        <h1 style={{ color: '#fff', marginBottom: '0.75rem' }}>Perfil de Usuario</h1>
        <p style={{ margin: '20px 0', color: '#ccc' }}>
          Email: <strong>{user?.email}</strong>
        </p>
        <Button variant="danger" onClick={logout} style={{ borderRadius: '999px', fontWeight: '700', padding: '0.85rem 1.6rem' }}>
          <FaSignOutAlt className="me-2" /> Cerrar Sesión
        </Button>
      </ProfileCard>
    </Container>
  );
};

export default Perfil;

