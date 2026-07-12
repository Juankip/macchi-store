import { useCallback, useEffect, useState } from 'react';
import { collection, getDocs, addDoc, doc, updateDoc, deleteDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../../firebase/config';
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

const CouponAdmin = () => {
  const [cupones, setCupones] = useState([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [mode, setMode] = useState('create');
  const [editingId, setEditingId] = useState(null);
  const [showConfirm, setShowConfirm] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [form, setForm] = useState({
    codigo: '',
    descuento: '',
    tipo: 'porcentaje',
    activo: true,
  });

  const loadCupones = useCallback(async () => {
    const cuponesCollection = collection(db, 'cupones');
    setLoading(true);
    setError('');
    try {
      const snapshot = await getDocs(cuponesCollection);
      const lista = snapshot.docs.map((docItem) => ({ id: docItem.id, ...docItem.data() }));
      setCupones(lista);
    } catch (err) {
      console.error('Error cargando cupones:', err);
      setError('No se pudieron cargar los cupones. Reintentá en unos segundos.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadCupones();
  }, [loadCupones]);

  const validateForm = () => {
    if (!form.codigo.trim()) return 'El código del cupón es obligatorio.';
    if (!form.descuento || Number(form.descuento) <= 0) return 'El descuento debe ser mayor que cero.';
    if (!form.tipo.trim()) return 'El tipo de descuento es obligatorio.';
    return '';
  };

  const resetForm = () => {
    setForm({ codigo: '', descuento: '', tipo: 'porcentaje', activo: true });
    setMode('create');
    setEditingId(null);
    setError('');
    setMessage('');
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: name === 'activo' ? value === 'true' : value,
    });
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
      codigo: form.codigo.trim(),
      descuento: Number(form.descuento),
      tipo: form.tipo.trim(),
      activo: form.activo,
      updatedAt: serverTimestamp(),
    };

    try {
      if (mode === 'edit' && editingId) {
        const couponDoc = doc(db, 'cupones', editingId);
        await updateDoc(couponDoc, payload);
        setMessage('Cupón actualizado correctamente.');
      } else {
        await addDoc(collection(db, 'cupones'), {
          ...payload,
          createdAt: serverTimestamp(),
        });
        setMessage('Cupón agregado correctamente.');
      }
      await loadCupones();
      resetForm();
    } catch (err) {
      console.error('Error guardando cupón:', err);
      setError('Hubo un error al guardar el cupón. Verificá los datos y volvé a intentarlo.');
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (coupon) => {
    setForm({
      codigo: coupon.codigo || '',
      descuento: coupon.descuento || '',
      tipo: coupon.tipo || 'porcentaje',
      activo: coupon.activo ?? true,
    });
    setMode('edit');
    setEditingId(coupon.id);
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
      await deleteDoc(doc(db, 'cupones', deleteId));
      setMessage('Cupón eliminado exitosamente.');
      await loadCupones();
    } catch (err) {
      console.error('Error eliminando cupón:', err);
      setError('No se pudo eliminar el cupón. Intentá nuevamente.');
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
      <SEO title="Administrador de Cupones | Gen Rockero" description="Gestioná cupones de descuento desde el panel administrativo." />
      <AdminCard className="p-4 mt-4">
        <SectionHeader>
          <div>
            <h1 style={{ margin: 0, fontSize: '1.75rem' }}>Administración de Cupones</h1>
            <p style={{ color: '#aaa', marginTop: '0.5rem' }}>Creá, editá y eliminá códigos de descuento válidos para la tienda.</p>
          </div>
          <ActionBar>
            <ButtonRounded variant="outline-light" onClick={loadCupones}>
              <FaSyncAlt className="me-2" /> Actualizar lista
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
                name="codigo"
                value={form.codigo}
                onChange={handleChange}
                placeholder="Código del cupón"
                required
                style={{ backgroundColor: '#111', borderColor: '#333', color: '#eee' }}
              />
            </Col>
            <Col xs={12} md={6}>
              <Form.Control
                name="descuento"
                type="number"
                step="0.01"
                value={form.descuento}
                onChange={handleChange}
                placeholder="Descuento"
                required
                style={{ backgroundColor: '#111', borderColor: '#333', color: '#eee' }}
              />
            </Col>
            <Col xs={12} md={6}>
              <Form.Select
                name="tipo"
                value={form.tipo}
                onChange={handleChange}
                style={{ backgroundColor: '#111', borderColor: '#333', color: '#eee' }}
              >
                <option value="porcentaje">Porcentaje</option>
                <option value="monto">Monto fijo</option>
              </Form.Select>
            </Col>
            <Col xs={12} md={6}>
              <Form.Select
                name="activo"
                value={form.activo.toString()}
                onChange={handleChange}
                style={{ backgroundColor: '#111', borderColor: '#333', color: '#eee' }}
              >
                <option value="true">Activo</option>
                <option value="false">Inactivo</option>
              </Form.Select>
            </Col>
          </Row>

          <div style={{ marginTop: '1.25rem', display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
            <ButtonRounded type="submit" variant="danger" disabled={saving}>
              <FaPlus className="me-2" /> {saving ? 'Guardando...' : mode === 'edit' ? 'Actualizar cupón' : 'Agregar cupón'}
            </ButtonRounded>
          </div>

          {error && <p style={{ color: '#ff7373', marginTop: '1rem' }}>{error}</p>}
          {message && <p style={{ color: '#7ed957', marginTop: '1rem' }}>{message}</p>}
        </Form>
      </AdminCard>

      <AdminCard className="p-4 mt-4">
        <SectionHeader>
          <h2 style={{ margin: 0 }}>Listado de Cupones</h2>
        </SectionHeader>

        {loading ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: '#ccc' }}>
            <Spinner animation="border" size="sm" variant="light" />
            <span>Cargando cupones...</span>
          </div>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <Table striped bordered hover variant="dark" responsive>
              <thead>
                <tr>
                  <th>Código</th>
                  <th>Tipo</th>
                  <th>Descuento</th>
                  <th>Activo</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {cupones.map((coupon) => (
                  <tr key={coupon.id}>
                    <td>{coupon.codigo}</td>
                    <td>{coupon.tipo}</td>
                    <td style={{ color: '#c1121f' }}>
                      {coupon.tipo === 'porcentaje' ? `${coupon.descuento}%` : `$${Number(coupon.descuento).toLocaleString('es-AR')}`}
                    </td>
                    <td>{coupon.activo ? 'Sí' : 'No'}</td>
                    <td>
                      <ButtonRounded variant="outline-secondary" size="sm" onClick={() => handleEdit(coupon)}>
                        <FaEdit className="me-1" /> Editar
                      </ButtonRounded>
                      <ButtonRounded variant="outline-danger" size="sm" onClick={() => confirmDelete(coupon.id)}>
                        <FaTrash className="me-1" /> Eliminar
                      </ButtonRounded>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
            {cupones.length === 0 && <p style={{ color: '#aaa' }}>No hay cupones cargados.</p>}
          </div>
        )}
      </AdminCard>

      {showConfirm && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,.75)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 50 }}>
          <div style={{ width: '100%', maxWidth: '420px', backgroundColor: '#111', borderRadius: '1rem', padding: '1.5rem', border: '1px solid #333' }}>
            <h3 style={{ marginBottom: '1rem', color: '#fff' }}>Confirmar eliminación</h3>
            <p style={{ color: '#ccc', marginBottom: '1.5rem' }}>¿Querés eliminar este cupón definitivamente?</p>
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

export default CouponAdmin;
