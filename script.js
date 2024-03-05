document.addEventListener('DOMContentLoaded', function () {
    const productForm = document.getElementById('productForm');
    const productTableBody = document.getElementById('productBody');

    let productId = 0;
    let productNameElement;
    let productDescriptionElement;
    let productPriceElement;
    let productCategoryElement;

    productForm.addEventListener('submit', function (event) {
        event.preventDefault();
        
        const nombre = document.getElementById('nombreProducto').value;
        const descripcion = document.getElementById('descripcionProducto').value;
        const precio = document.getElementById('precioProducto').value;
        const categoria = document.getElementById('categoriaProducto').value;
        const imagenInput = document.getElementById('imagenProducto');
        const imagenFile = imagenInput.files[0];

        const reader = new FileReader();
        reader.onload = function(event) {
            const imagenBase64 = event.target.result;

            const newRow = document.createElement('tr');
            productId++;

            newRow.innerHTML = `
                <td class="productId">${productId}</td>
                <td class="productName">${nombre}</td>
                <td class="productDescription">${descripcion}</td>
                <td class="productPrice">${precio}</td>
                <td class="productCategory">${categoria}</td>
                <td><img src="${imagenBase64}" alt="Imagen del producto" style="max-width: 100px;"></td>
                <td>
                <button class="edit-btn">Editar
                <svg class="svg" viewBox="0 0 512 512">
                  <path d="M410.3 231l11.3-11.3-33.9-33.9-62.1-62.1L291.7 89.8l-11.3 11.3-22.6 22.6L58.6 322.9c-10.4 10.4-18 23.3-22.2 37.4L1 480.7c-2.5 8.4-.2 17.5 6.1 23.7s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L387.7 253.7 410.3 231zM160 399.4l-9.1 22.7c-4 3.1-8.5 5.4-13.3 6.9L59.4 452l23-78.1c1.4-4.9 3.8-9.4 6.9-13.3l22.7-9.1v32c0 8.8 7.2 16 16 16h32zM362.7 18.7L348.3 33.2 325.7 55.8 314.3 67.1l33.9 33.9 62.1 62.1 33.9 33.9 11.3-11.3 22.6-22.6 14.5-14.5c25-25 25-65.5 0-90.5L453.3 18.7c-25-25-65.5-25-90.5 0zm-47.4 168l-144 144c-6.2 6.2-16.4 6.2-22.6 0s-6.2-16.4 0-22.6l144-144c6.2-6.2 16.4-6.2 22.6 0s6.2 16.4 0 22.6z"></path></svg>
              </button>
              <br>
                    <button class="delete-btn btn btn-danger">Eliminar</button>
                </td>
            `;

            productTableBody.appendChild(newRow);

            document.getElementById('nombreProducto').value = '';
            document.getElementById('descripcionProducto').value = '';
            document.getElementById('precioProducto').value = '';
            document.getElementById('categoriaProducto').value = '';
            document.getElementById('imagenProducto').value = '';

            const deleteBtn = newRow.querySelector('.delete-btn');
            deleteBtn.addEventListener('click', function () {
                newRow.remove();
            });

            const editBtn = newRow.querySelector('.edit-btn');
            productNameElement = newRow.querySelector('.productName');
            productDescriptionElement = newRow.querySelector('.productDescription');
            productPriceElement = newRow.querySelector('.productPrice');
            productCategoryElement = newRow.querySelector('.productCategory');

            editBtn.addEventListener('click', function () {
                document.getElementById('editNombre').value = productNameElement.textContent;
                document.getElementById('editDescripcion').value = productDescriptionElement.textContent;
                document.getElementById('editPrecio').value = productPriceElement.textContent;
                document.getElementById('editCategoria').value = productCategoryElement.textContent;

                $('#editModal').modal('show');
            });
        };

        reader.readAsDataURL(imagenFile);
    });

    document.getElementById('saveChangesBtn').addEventListener('click', function () {
        if (productNameElement && productDescriptionElement && productPriceElement && productCategoryElement) {
            productNameElement.textContent = document.getElementById('editNombre').value;
            productDescriptionElement.textContent = document.getElementById('editDescripcion').value;
            productPriceElement.textContent = document.getElementById('editPrecio').value;
            productCategoryElement.textContent = document.getElementById('editCategoria').value;
        }

        $('#editModal').modal('hide');
    });
});
