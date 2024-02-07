const mensaje_personalizadoCtl = {}
const sql = require('../Database/dataBase.sql')
const orm = require('../Database/dataBase.orm')

mensaje_personalizadoCtl.mostrar = (req, res) => {
    res.render('mensaje_personalizado/agregar', { showNavbar: true });
}

//mandar
mensaje_personalizadoCtl.mandar = async (req, res) => {
    const id =req.id_mensaje_personalizado  //ojo
    const {  mensaje, descripcion, fecha_mensaje,hora_mensaje } = req.body
    const nuevoEnvio = {
        mensaje, 
        descripcion, 
        fecha_mensaje,
        // detalle 
        hora_mensaje
 
    }
    await orm.mensaje_personalizado.create(nuevoEnvio)
    await orm.detalle_mensaje_personalizado.create(nuevoEnvio)
    req.flash('success', 'Guardado exitosamente')
    res.redirect('/mensaje_personalizado/listar/')
}

mensaje_personalizadoCtl.listar = async (req, res) => {
    const lista = await sql.query('SELECT * FROM mensaje_personalizados INNER JOIN detalle_mensaje_personalizados ON mensaje_personalizados.id_mensaje_personalizado = detalle_mensaje_personalizados.id_detalle_mensaje_personalizado');
    res.render('mensaje_personalizado/listar', { lista, showNavbar: true })
}


//traer datos
mensaje_personalizadoCtl.traer = async (req, res) => {
    const ids = req.params.id
    const lista = await sql.query('SELECT * FROM mensaje_personalizados INNER JOIN detalle_mensaje_personalizados ON mensaje_personalizados.id_mensaje_personalizado = detalle_mensaje_personalizados.id_detalle_mensaje_personalizado   where id_mensaje_personalizado =?', [ids])
    //const listan = await sql.query('select *from  detalle_familiares  where id_detalle_familiar =?', [ids])
    res.render('mensaje_personalizado/editar',{ lista, showNavbar: true })
}

mensaje_personalizadoCtl.actualizar = async (req, res) => {
    
    const id_personalizado = req.params.idpersonalizado
    const id_detalle = req.params.iddetalle
    const {mensaje, descripcion, fecha_mensaje,hora_mensaje  } = req.body
    
    const nuevoEnvioFamiliar = {
        mensaje, 
        descripcion, 
        fecha_mensaje,
        hora_mensaje 
    }
    const nuevoEnvioDetalle = {
        //id_detalle_mensaje_personalizado:id_detalle,
        hora_mensaje
    }
    await orm.mensaje_personalizado.findOne({ where: { id_mensaje_personalizado: id_personalizado } })
        .then(actualizar => {
            actualizar.update(nuevoEnvioFamiliar)
        })
    await orm.detalle_mensaje_personalizado.findOne({ where: { id_detalle_mensaje_personalizado: id_detalle } })
    .then(actualizar => {
        actualizar.update(nuevoEnvioDetalle)
    })
    req.flash('success', 'Actualizado exitosamente')
    res.redirect('/mensaje_personalizado/listar/');
    
}

//Funciona
mensaje_personalizadoCtl.eliminar = async (req, res) => {
    const ids = req.params.id
    await orm.mensaje_personalizado.destroy({ where: { id_mensaje_personalizado: ids } }),
    await orm.detalle_mensaje_personalizado.destroy({ where: { id_detalle_mensaje_personalizado: ids } })
        .then(() => {
            req.flash('success', 'Eliminado exitosamente')
            res.redirect('/mensaje_personalizado/listar/');
        })
}


module.exports = mensaje_personalizadoCtl