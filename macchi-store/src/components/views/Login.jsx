import { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/auth-context';
import { Container, Card, Form, Button, InputGroup } from 'react-bootstrap';
import { FaEnvelope, FaLock } from 'react-icons/fa';
import styled from 'styled-components';
import SEO from '../common/SEO';

const AuthCard = styled(Card)`
  background-color: #171717;
  border: 1px solid #282828;
  border-radius: 1rem;
  color: #eee;
`;

const AuthButton = styled(Button)`
  border-radius: 999px;
  font-weight: 700;
  padding: 0.85rem 1.6rem;
`;

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  
  const { login } = useContext(AuthContext);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      navigate('/perfil');
    } catch (err) {
      setError('Error al iniciar sesión: ' + err.message);
    }
  };

  return (
    <Container fluid className="px-0 px-md-3">
      <SEO title="Iniciar sesión | Gen Rockero" description="Ingresá a tu cuenta para ver tu perfil y finalizar compras." />
      <AuthCard className="p-4 mt-4 mx-auto" style={{ maxWidth: '520px' }}>
        <h2 style={{ color: '#fff', marginBottom: '1rem' }}>Iniciar Sesión</h2>
        <Form onSubmit={handleLogin}>
          <Form.Group className="mb-3" controlId="loginEmail">
            <Form.Label style={{ color: '#ccc' }}>Email</Form.Label>
            <InputGroup>
              <InputGroup.Text style={{ backgroundColor: '#111', borderColor: '#333', color: '#ccc' }}><FaEnvelope /></InputGroup.Text>
              <Form.Control
                type="email"
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
                required
                style={{ backgroundColor: '#111', borderColor: '#333', color: '#eee' }}
              />
            </InputGroup>
          </Form.Group>
          <Form.Group className="mb-4" controlId="loginPassword">
            <Form.Label style={{ color: '#ccc' }}>Contraseña</Form.Label>
            <InputGroup>
              <InputGroup.Text style={{ backgroundColor: '#111', borderColor: '#333', color: '#ccc' }}><FaLock /></InputGroup.Text>
              <Form.Control
                type="password"
                placeholder="Contraseña"
                onChange={(e) => setPassword(e.target.value)}
                required
                style={{ backgroundColor: '#111', borderColor: '#333', color: '#eee' }}
              />
            </InputGroup>
          </Form.Group>
          <AuthButton type="submit" variant="danger" className="w-100">Ingresar</AuthButton>
        </Form>
        {error && <p style={{ color: '#ff6b6b', marginTop: '1rem' }}>{error}</p>}
        <p style={{ marginTop: '1.5rem', color: '#ccc' }}>
          ¿No tenés cuenta? <Link to="/register" style={{ color: '#c1121f', textDecoration: 'none' }}>Registrate</Link>
        </p>
      </AuthCard>
    </Container>
  );
};

export default Login;

