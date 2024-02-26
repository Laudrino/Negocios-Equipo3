document.addEventListener('DOMContentLoaded', () => {
    let products = []; 
    let productIdCounter = 0; // Contador para asignar IDs únicos a los productos

    document.getElementById('addImageButton').addEventListener('click', function() {
        document.getElementById('imagenProducto').click();
    });

    document.getElementById('productForm').addEventListener('submit', function(e) {
        e.preventDefault(); 

        const id = productIdCounter++; // Asignar un nuevo ID único
        const nombre = document.getElementById('nombreProducto').value;
        const descripcion = document.getElementById('descripcionProducto').value;
        const precio = document.getElementById('precioProducto').value;
        const categoria = document.getElementById('categoriaProducto').value;
        const imagen = document.getElementById('imagenProducto').files[0];

        const reader = new FileReader();
        reader.onload = function(event) {
            const imagenBase64 = event.target.result;
            products.push({
                id,
                nombre,
                descripcion,
                precio,
                imagen: imagenBase64,
                categoria
            });
            displayProductsOnPage(products); 
        };
        reader.readAsDataURL(imagen);

        // Limpiar los campos del formulario
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
            const productEl = createProductElement(product);
            productsList.appendChild(productEl);
        });
    }

    function createProductElement(product) {
        const productEl = document.createElement('div');
        productEl.innerHTML = `
            <strong>ID:</strong> ${product.id}<br>
            <strong>Nombre:</strong> ${product.nombre}<br>
            <strong>Descripción:</strong> ${product.descripcion}<br>
            <strong>Precio:</strong> $${product.precio}<br>
            <strong>Categoría:</strong> ${product.categoria}<br>
            <img src="${product.imagen}" alt="Imagen del producto" style="max-width: 100px;">
            <button data-id="${product.id}" class="delete-button" id="borrar">Eliminar</button><br>
        `;
        return productEl;
    }

    //borrar
    document.getElementById('productsList').addEventListener('click', function (e) {
        if (e.target && e.target.nodeName === 'BUTTON' && e.target.classList.contains('delete-button')) {
            const productId = parseInt(e.target.getAttribute('data-id'));
            deleteProduct(productId);
        }
    });

    function deleteProduct(productId) {
        products = products.filter(product => product.id !== productId);
        displayProductsOnPage(products);
    }
});
