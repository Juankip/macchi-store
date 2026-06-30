import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Item from '../common/Item';
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase/config";

const ItemListContainer = () => {
  const [productos, setProductos] = useState([]);
  const [busqueda, setBusqueda] = useState('');
  
  const { categoriaId } = useParams();

  useEffect(() => {
    console.log("Iniciando conexión con Firebase...");
    const productosRef = collection(db, "productos");

    getDocs(productosRef)
      .then((respuesta) => {
        console.log("Cantidad de documentos encontrados:", respuesta.size);
        
        const catalogo = respuesta.docs.map((doc) => ({ 
          id: doc.id, 
          ...doc.data() 
        }));
        
        console.log("Catálogo completo:", catalogo);

        if (categoriaId) {
          const filtrados = catalogo.filter(prod => prod.categoria === categoriaId);
          setProductos(filtrados);
        } else {
          setProductos(catalogo);
        }
      })
      .catch((error) => {
        console.error("Error al conectar con Firebase:", error);
      });
  }, [categoriaId]);

  const productosFiltrados = productos.filter(prod => 
    prod.nombre?.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <div>
      <div style={{ backgroundColor: '#1a1a1a', padding: '20px', borderRadius: '8px', marginBottom: '30px', border: '1px solid #333' }}>
        <input 
          type="text" 
          placeholder="Buscar banda o diseño... 🎸" 
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          style={{ width: '100%', padding: '12px', borderRadius: '4px', border: 'none' }}
        />
      </div>

      <h2>{categoriaId ? `Categoría: ${categoriaId}` : 'Catálogo Completo'}</h2>
      
      <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
        {productos.length > 0 ? (
          productosFiltrados.map(prod => <Item key={prod.id} {...prod} />)
        ) : (
          <p>Cargando productos desde la nube o no hay resultados...</p>
        )}
      </div>
    </div>
  );
};

export default ItemListContainer;