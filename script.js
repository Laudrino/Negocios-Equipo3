document.addEventListener('DOMContentLoaded', () => {
    let products = []; 

    document.getElementById('productForm').addEventListener('submit', function(e) {
        e.preventDefault(); 

        const nombre = document.getElementById('nombreProducto').value;
        const descripcion = document.getElementById('descripcionProducto').value;
        const precio = document.getElementById('precioProducto').value;
        const categoria = document.getElementById('categoriaProducto').value;
        const imagen = document.getElementById('imagenProducto').files[0];

        const reader = new FileReader();
        reader.onload = function(event) {
            const imagenBase64 = event.target.result;
            const productId = Date.now().toString();
            products.push({
                id: productId,
                nombre,
                descripcion,
                precio,
                imagen: imagenBase64,
                categoria
            });
            displayProductsOnPage(products); 
        };
        reader.readAsDataURL(imagen);

        document.getElementById('nombreProducto').value = '';
        document.getElementById('descripcionProducto').value = '';
        document.getElementById('precioProducto').value = '';
        document.getElementById('imagenProducto').value = '';
        document.getElementById('categoriaProducto').value = '';
    });

    function displayProductsOnPage(products) {
        const productsList = document.getElementById('productsList');
        productsList.innerHTML = ''; 

        products.forEach(product => {
            const productEl = document.createElement('div');
            productEl.innerHTML = `
                <strong>Nombre:</strong> ${product.nombre}<br>
                <strong>Descripción:</strong> ${product.descripcion}<br>
                <strong>Precio:</strong> $${product.precio}<br>
                <strong>Categoría:</strong> ${product.categoria}<br>
                <img src="${product.imagen}" alt="Imagen del producto" style="max-width: 100px;">
                <button data-id="${product.id}">Eliminar</button><br>
            `;
            productsList.appendChild(productEl);
        });
    }
     document.getElementById('productsList').addEventListener('click', function (e) {
        if (e.target && e.target.nodeName === 'BUTTON' && e.target.hasAttribute('data-id')) {
            const productId = e.target.getAttribute('data-id');
            deleteProduct(productId);
        }
    });

    //borrar
    function deleteProduct(productId) {
        const productIndex = products.findIndex(product => product.id === productId);
        if (productIndex !== -1) {
            products.splice(productIndex, 1);
            displayProductsOnPage(products);
        }
    }
});
