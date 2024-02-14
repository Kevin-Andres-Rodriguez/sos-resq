document.addEventListener('DOMContentLoaded', function () {
    const sidebar = document.getElementById('sidebar');
    const menuToggle = document.querySelector('.menu-toggle');

    menuToggle.addEventListener('click', function () {
        sidebar.classList.toggle('show');
    });

    // Cierra la barra lateral cuando se hace clic en un elemento del menú
    const menuItems = document.querySelectorAll('#sidebar a');
    menuItems.forEach(function (item) {
        item.addEventListener('click', function () {
            sidebar.classList.remove('show');
        });
    });
});