document.addEventListener('DOMContentLoaded', () => {
    let products = []; // Almacena los productos

    document.getElementById('productForm').addEventListener('submit', function(e) {
        e.preventDefault(); // Previene la recarga de la página

        const nombre = document.getElementById('nombreProducto').value;
        const descripcion = document.getElementById('descripcionProducto').value;
        const precio = document.getElementById('precioProducto').value;

        products.push({ nombre, descripcion, precio });
        displayProductsOnPage(products); // Actualiza la lista de productos en la página

        document.getElementById('nombreProducto').value = '';
        document.getElementById('descripcionProducto').value = '';
        document.getElementById('precioProducto').value = '';
    });

    document.getElementById('searchButton').addEventListener('click', function() {
        const searchValue = document.getElementById('searchBar').value.toLowerCase();
        const filteredProducts = products.filter(product =>
            product.nombre.toLowerCase().includes(searchValue) ||
            product.descripcion.toLowerCase().includes(searchValue)
        );

        const searchWindow = window.open('', 'SearchResults', 'width=600,height=400');
        searchWindow.document.write('<html><head><title>Resultados de Búsqueda</title></head><body>');
        searchWindow.document.write('<h2>Resultados de Búsqueda</h2>');

        if(filteredProducts.length > 0) {
            filteredProducts.forEach(product => {
                searchWindow.document.write(`<p><strong>Nombre:</strong> ${product.nombre}<br><strong>Descripción:</strong> ${product.descripcion}<br><strong>Precio:</strong> $${product.precio}</p>`);
            });
        } else {
            searchWindow.document.write('<p>No se encontraron productos.</p>');
        }

        searchWindow.document.write('</body></html>');
        searchWindow.document.close(); // Asegura que el documento en la nueva ventana se maneje correctamente
    });

    function displayProductsOnPage(products) {
        const productsList = document.getElementById('productsList');
        productsList.innerHTML = ''; // Limpia el contenedor de productos

        products.forEach(product => {
            const productEl = document.createElement('div');
            productEl.innerHTML = `<strong>Nombre:</strong> ${product.nombre}<br><strong>Descripción:</strong> ${product.descripcion}<br><strong>Precio:</strong> $${product.precio}`;
            productsList.appendChild(productEl);
        });
    }
});
