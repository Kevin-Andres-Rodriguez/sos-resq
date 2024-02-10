document.querySelectorAll('.botonEliminar').forEach(function(boton) {
    boton.onclick = function(event) {
        // Prevenir la acción predeterminada del enlace
        event.preventDefault();

        // Obtener el ID del registro familiar desde el botón
        var id_registro_familiar = this.getAttribute('data-id');

        var confirmacion = confirm('¿Estás seguro que quieres eliminar el registro? Presiona "Aceptar" para eliminar o "Cancelar" para no hacerlo.');

        if (confirmacion) {
            // Si el usuario hace clic en "Aceptar", redirigir a la URL de eliminación
            window.location.href = '/registro_familiar/eliminar/' + id_registro_familiar;
        }
    };
});
