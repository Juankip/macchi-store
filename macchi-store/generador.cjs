const fs = require('fs');
const path = require('path');

// Rutas a tus carpetas
const rutaImg = path.join(__dirname, 'public', 'img');
const rutaJson = path.join(__dirname, 'public', 'productos.json');

let productos = [];
let contadorId = 1;

// Precios por categoría
const preciosBase = {
    "rock": 25000,
    "buzos": 45000,
    "remeras-dama": 25000,
    "remeras-sin-mangas": 22000,
    "talles-especiales": 28000,
    "tematica-argentina": 25000
};

if (fs.existsSync(rutaImg)) {
    const categorias = fs.readdirSync(rutaImg);

    categorias.forEach(categoria => {
        const rutaCategoria = path.join(rutaImg, categoria);

        if (fs.statSync(rutaCategoria).isDirectory()) {
            const archivos = fs.readdirSync(rutaCategoria);
            
            // Filtramos solo imágenes
            const imagenes = archivos.filter(f => f.match(/\.(jpg|jpeg|png)$/i));

            // Ordenamos por número
            imagenes.sort((a, b) => {
                const numA = parseInt(a.split('.')[0]) || 0;
                const numB = parseInt(b.split('.')[0]) || 0;
                return numA - numB;
            });

            imagenes.forEach(imagen => {
                const catLower = categoria.toLowerCase();
                const precio = preciosBase[catLower] || 25000;
                
                // Limpiamos el nombre
                const nombreLindo = categoria.replace(/-/g, " ").replace(/\b\w/g, l => l.toUpperCase());
                const numeroModelo = imagen.split('.')[0];

                productos.push({
                    id: contadorId,
                    nombre: `${nombreLindo} - Diseño ${numeroModelo}`,
                    precio: precio,
                    categoria: catLower,
                    imagen: `/img/${categoria}/${imagen}`
                });
                contadorId++;
            });
        }
    });

    // Sobreescribimos el productos.json
    fs.writeFileSync(rutaJson, JSON.stringify(productos, null, 2), 'utf-8');
    console.log(`¡Un éxito! Se agregaron ${productos.length} prendas al catálogo.`);
} else {
    console.log(`Error: No se encontró la carpeta en ${rutaImg}. Asegurate de que la terminal esté en macchi-store.`);
}