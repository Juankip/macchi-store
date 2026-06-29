import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Item from '../common/Item';
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase/config";

const ItemListContainer = () => {
  const [productos, setProductos] = useState([]);
  const [busqueda, setBusqueda] = useState('');
  
  const { categoriaId } = useParams();

  // CARGA DESDE FIREBASE
  useEffect(() => {
    const productosRef = collection(db, "productos");
    getDocs(productosRef)
      .then((respuesta) => {
        const catalogo = respuesta.docs.map((doc) => {
          return { id: doc.id, ...doc.data() };
        });

        if (categoriaId) {
          const filtrados = catalogo.filter(prod => prod.categoria === categoriaId);
          setProductos(filtrados);
        } else {
          setProductos(catalogo);
        }
      })
      .catch(error => console.error("Error conectando a Firebase:", error));
  }, [categoriaId]);

  const productosFiltrados = productos.filter(prod => 
    prod.nombre.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <div>
      {/* BARRA DE BÚSQUEDA */}
      <div style={{ backgroundColor: '#1a1a1a', padding: '20px', borderRadius: '8px', marginBottom: '30px', border: '1px solid #333' }}>
        <input 
          type="text" 
          placeholder="Buscar banda o diseño... 🎸" 
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          style={{ width: '100%', padding: '12px', borderRadius: '4px', border: 'none', fontSize: '16px', fontFamily: 'sans-serif' }}
        />
      </div>

      {/* TÍTULO DINÁMICO */}
      <h2 style={{ fontFamily: 'sans-serif', color: '#fff', borderBottom: '2px solid #333', paddingBottom: '10px', textTransform: 'uppercase' }}>
        {categoriaId ? `Categoría: ${categoriaId.replace(/-/g, ' ')}` : 'Catálogo Completo'} 
        <span style={{ color: '#aaa', fontSize: '16px', marginLeft: '15px', textTransform: 'none' }}>
          ({productosFiltrados.length} resultados)
        </span>
      </h2>
      
      {/* GRILLA DE PRODUCTOS */}
      <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', marginTop: '20px' }}>
        {productosFiltrados.length > 0 ? (
          productosFiltrados.map(prod => (
            <Item key={prod.id} {...prod} />
          ))
        ) : (
          <p style={{ color: '#aaa', fontSize: '18px' }}>Cargando productos desde la nube...</p>
        )}
      </div>
    </div>
  );
};

export default ItemListContainer;