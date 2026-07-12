/* eslint-disable react-hooks/set-state-in-effect */
import { useCallback, useEffect, useState } from 'react';
import { collection, getDocs, addDoc, doc, updateDoc, deleteDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../../firebase/config';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Form, Button, Table, Card, Spinner } from 'react-bootstrap';
import { FaEdit, FaTrash, FaPlus, FaSyncAlt } from 'react-icons/fa';
import styled from 'styled-components';
import SEO from '../common/SEO';

const AdminCard = styled(Card)`
  background-color: #191919;
  border: 1px solid #272727;
  border-radius: 1rem;
  color: #eee;
`;

const SectionHeader = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  margin-bottom: 1.25rem;
`;

const ActionBar = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
`;

const ButtonRounded = styled(Button)`
  border-radius: 999px;
  font-weight: 700;
`;

const ProductAdmin = () => {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [mode, setMode] = useState('create');
  const [editingId, setEditingId] = useState(null);
  const [showConfirm, setShowConfirm] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [form, setForm] = useState({
    nombre: '',
    precio: '',
    categoria: '',
    imagen: '',
    talle: '',
    descripcion: '',
  });

  const loadProductos = useCallback(async () => {
    const productosCollection = collection(db, 'productos');
    setLoading(true);
    setError('');
    try {
      const snapshot = await getDocs(productosCollection);
      const lista = snapshot.docs.map((docItem) => ({ id: docItem.id, ...docItem.data() }));
      setProductos(lista);
    } catch (err) {
      console.error('Error cargando productos:', err);
      setError('No se pudieron cargar los productos. Reintentá en unos segundos.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadProductos();
  }, [loadProductos]);

  const validateForm = () => {
    if (!form.nombre.trim()) return 'El nombre del producto es obligatorio.';
    if (!form.categoria.trim()) return 'La categoría es obligatoria.';
    if (!form.imagen.trim()) return 'La URL de la imagen es obligatoria.';
    if (!form.precio || Number(form.precio) <= 0) return 'El precio debe ser mayor que cero.';
    return '';
  };

  const resetForm = () => {
    setForm({ nombre: '', precio: '', categoria: '', imagen: '', talle: '', descripcion: '' });
    setMode('create');
    setEditingId(null);
    setError('');
    setMessage('');
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validation = validateForm();
    if (validation) {
      setError(validation);
      return;
    }

    setSaving(true);
    setError('');
    setMessage('');

    const payload = {
      nombre: form.nombre.trim(),
      precio: Number(form.precio),
      categoria: form.categoria.trim(),
      imagen: form.imagen.trim(),
      talle: form.talle.trim(),
      descripcion: form.descripcion.trim(),
      updatedAt: serverTimestamp(),
    };

    try {
      if (mode === 'edit' && editingId) {
        const productDoc = doc(db, 'productos', editingId);
        await updateDoc(productDoc, payload);
        setMessage('Producto actualizado correctamente.');
      } else {
        await addDoc(collection(db, 'productos'), {
          ...payload,
          createdAt: serverTimestamp(),
        });
        setMessage('Producto agregado correctamente.');
      }
      await loadProductos();
      resetForm();
    } catch (err) {
      console.error('Error guardando producto:', err);
      setError('Hubo un error al guardar el producto. Verificá los datos y volvé a intentarlo.');
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (product) => {
    setForm({
      nombre: product.nombre || '',
      precio: product.precio || '',
      categoria: product.categoria || '',
      imagen: product.imagen || '',
      talle: product.talle || '',
      descripcion: product.descripcion || '',
    });
    setMode('edit');
    setEditingId(product.id);
    setError('');
    setMessage('');
  };

  const confirmDelete = (id) => {
    setDeleteId(id);
    setShowConfirm(true);
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    setShowConfirm(false);
    setLoading(true);
    setError('');
    setMessage('');
    try {
      await deleteDoc(doc(db, 'productos', deleteId));
      setMessage('Producto eliminado exitosamente.');
      await loadProductos();
    } catch (err) {
      console.error('Error eliminando producto:', err);
      setError('No se pudo eliminar el producto. Intentá nuevamente.');
    } finally {
      setLoading(false);
      setDeleteId(null);
    }
  };

  const cancelDelete = () => {
    setShowConfirm(false);
    setDeleteId(null);
  };

  return (
    <Container fluid className="px-0 px-md-3">
      <SEO title="Administrador de productos | Gen Rockero" description="Gestioná productos desde el panel de administración con una interfaz responsive." />
      <AdminCard className="p-4 mt-4">
        <SectionHeader>
          <div>
            <h1 style={{ margin: 0, fontSize: '1.75rem' }}>Administración de Productos</h1>
            <p style={{ color: '#aaa', marginTop: '0.5rem' }}>Cargá, editá o eliminá productos de la tienda con facilidad.</p>
          </div>
          <ActionBar>
            <ButtonRounded variant="outline-light" onClick={loadProductos}>
              <FaSyncAlt className="me-2" /> Actualizar lista
            </ButtonRounded>
            <ButtonRounded as={Link} to="/admin/cupones" variant="outline-light">
              Administración de Cupones
            </ButtonRounded>
            {mode === 'edit' && (
              <ButtonRounded variant="secondary" onClick={resetForm}>
                Cancelar edición
              </ButtonRounded>
            )}
          </ActionBar>
        </SectionHeader>

        <Form onSubmit={handleSubmit}>
          <Row className="g-3">
            <Col xs={12} md={6}>
              <Form.Control
                name="nombre"
                value={form.nombre}
                onChange={handleChange}
                placeholder="Nombre del producto"
                required
                style={{ backgroundColor: '#111', borderColor: '#333', color: '#eee' }}
              />
            </Col>
            <Col xs={12} md={6}>
              <Form.Control
                name="categoria"
                value={form.categoria}
                onChange={handleChange}
                placeholder="Categoría"
                required
                style={{ backgroundColor: '#111', borderColor: '#333', color: '#eee' }}
              />
            </Col>
            <Col xs={12} md={6}>
              <Form.Control
                name="precio"
                type="number"
                step="0.01"
                value={form.precio}
                onChange={handleChange}
                placeholder="Precio"
                required
                style={{ backgroundColor: '#111', borderColor: '#333', color: '#eee' }}
              />
            </Col>
            <Col xs={12} md={6}>
              <Form.Control
                name="imagen"
                value={form.imagen}
                onChange={handleChange}
                placeholder="URL de la imagen"
                required
                style={{ backgroundColor: '#111', borderColor: '#333', color: '#eee' }}
              />
            </Col>
            <Col xs={12} md={6}>
              <Form.Control
                name="talle"
                value={form.talle}
                onChange={handleChange}
                placeholder="Talle (opcional)"
                style={{ backgroundColor: '#111', borderColor: '#333', color: '#eee' }}
              />
            </Col>
            <Col xs={12} md={6}>
              <Form.Control
                as="textarea"
                name="descripcion"
                value={form.descripcion}
                onChange={handleChange}
                placeholder="Descripción"
                rows={1}
                style={{ backgroundColor: '#111', borderColor: '#333', color: '#eee' }}
              />
            </Col>
          </Row>

          <div style={{ marginTop: '1.25rem', display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
            <ButtonRounded type="submit" variant="danger" disabled={saving}>
              <FaPlus className="me-2" /> {saving ? 'Guardando...' : mode === 'edit' ? 'Actualizar producto' : 'Agregar producto'}
            </ButtonRounded>
          </div>

          {error && <p style={{ color: '#ff7373', marginTop: '1rem' }}>{error}</p>}
          {message && <p style={{ color: '#7ed957', marginTop: '1rem' }}>{message}</p>}
        </Form>
      </AdminCard>

      <AdminCard className="p-4 mt-4">
        <SectionHeader>
          <h2 style={{ margin: 0 }}>Listado de Productos</h2>
        </SectionHeader>

        {loading ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: '#ccc' }}>
            <Spinner animation="border" size="sm" variant="light" />
            <span>Cargando productos...</span>
          </div>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <Table striped bordered hover variant="dark" responsive>
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th>Categoría</th>
                  <th>Precio</th>
                  <th>Talle</th>
                  <th>Imagen</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {productos.map((product) => (
                  <tr key={product.id}>
                    <td>{product.nombre}</td>
                    <td>{product.categoria}</td>
                    <td style={{ color: '#c1121f' }}>${Number(product.precio).toLocaleString('es-AR', { minimumFractionDigits: 2 })}</td>
                    <td>{product.talle || '-'}</td>
                    <td><a href={product.imagen} target="_blank" rel="noreferrer" style={{ color: '#7ed957' }}>Ver</a></td>
                    <td>
                      <ButtonRounded variant="outline-secondary" size="sm" onClick={() => handleEdit(product)}>
                        <FaEdit className="me-1" /> Editar
                      </ButtonRounded>
                      <ButtonRounded variant="outline-danger" size="sm" onClick={() => confirmDelete(product.id)}>
                        <FaTrash className="me-1" /> Eliminar
                      </ButtonRounded>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
            {productos.length === 0 && <p style={{ color: '#aaa' }}>No hay productos cargados.</p>}
          </div>
        )}
      </AdminCard>

      {showConfirm && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,.75)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 50 }}>
          <div style={{ width: '100%', maxWidth: '420px', backgroundColor: '#111', borderRadius: '1rem', padding: '1.5rem', border: '1px solid #333' }}>
            <h3 style={{ marginBottom: '1rem', color: '#fff' }}>Confirmar eliminación</h3>
            <p style={{ color: '#ccc', marginBottom: '1.5rem' }}>¿Querés eliminar este producto definitivamente?</p>
            <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end', flexWrap: 'wrap' }}>
              <Button variant="outline-secondary" onClick={cancelDelete} style={{ borderRadius: '999px' }}>Cancelar</Button>
              <Button variant="danger" onClick={handleDelete} style={{ borderRadius: '999px' }}>Eliminar</Button>
            </div>
          </div>
        </div>
      )}
    </Container>
  );
};

export default ProductAdmin;

