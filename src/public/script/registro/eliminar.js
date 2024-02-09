document.getElementById('boton1').onclick = function(){
    var confirmacion = confirm('¿Estás seguro que quieres eliminar el registro? Presiona "Aceptar" para eliminar o "Cancelar" para no hacerlo.');
    if (confirmacion) {
        // Aquí puedes poner la lógica para eliminar el registro
        alert('Registro eliminado');
    } else {
        // Aquí puedes poner la lógica para cancelar la eliminación
        alert('Eliminación cancelada');
    }
}