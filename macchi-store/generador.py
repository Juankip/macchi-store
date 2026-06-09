import os
import json

# Ruta a la carpeta img
ruta_img = "./public/img"
productos = []
contador_id = 1

# Si hay más carpetas en el futuro, usan 25000 por defecto
precios_base = {
    "rock": 25000,
    "ROCK": 25000,
    "buzos": 45000,
    "remeras-dama": 25000,
    "remeras-sin-mangas": 22000,
    "talles-especiales": 28000
}

if os.path.exists(ruta_img):
    for categoria in os.listdir(ruta_img):
        ruta_categoria = os.path.join(ruta_img, categoria)
        
        if os.path.isdir(ruta_categoria):
            archivos = os.listdir(ruta_categoria)
            
            # Filtramos solo imágenes y las ordenamos por número
            imagenes = [f for f in archivos if f.endswith(('.jpg', '.png', '.jpeg'))]
            imagenes.sort(key=lambda x: int(x.split('.')[0]) if x.split('.')[0].isdigit() else 0)
            
            for imagen in imagenes:
                # Buscamos el precio asegurándonos de leer en minúscula
                precio = precios_base.get(categoria.lower(), 25000) 
                
                # Limpiamos el nombre para que se vea lindo en la página
                nombre_lindo = categoria.replace("-", " ").title()
                numero_modelo = imagen.split('.')[0]
                
                producto = {
                    "id": contador_id,
                    "nombre": f"{nombre_lindo} - Diseño {numero_modelo}",
                    "precio": precio,
                    "categoria": categoria.lower(),
                    "imagen": f"/img/{categoria}/{imagen}"
                }
                
                productos.append(producto)
                contador_id += 1

    # Guardamos todo en el JSON
    with open("./public/productos.json", "w", encoding="utf-8") as f:
        json.dump(productos, f, indent=2, ensure_ascii=False)

    print(f"¡Un éxito! Se agregaron {len(productos)} prendas al catálogo.")
else:
    print(f"Error: No se encontró la carpeta en {ruta_img}. Asegurate de que la terminal esté en macchi-store.")