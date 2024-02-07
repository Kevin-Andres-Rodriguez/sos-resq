const historial_activacionCtl = {}
const sql = require('../Database/dataBase.sql')
const orm = require('../Database/dataBase.orm')

historial_activacionCtl.mostrar = (req, res) => {
    res.render('historial_activacion/agregar', { showNavbar: true });
}

//mandar
historial_activacionCtl.mandar = async (req, res) => {
    const id =req.id_historial_activacion  //ojo
    const { fecha_activacion, hora_activacion, ubicacion   } = req.body
    const nuevoEnvio = {
        fecha_activacion, 
        hora_activacion, 
        ubicacion
 
    }
    await orm.historial_activacion.create(nuevoEnvio)
    await orm.detalle_historial.create(nuevoEnvio)
    req.flash('success', 'Guardado exitosamente')
    res.redirect('/historial_activacion/listar/')
}

historial_activacionCtl.listar = async (req, res) => {
    const lista = await sql.query('SELECT * FROM historial_activaciones INNER JOIN detalle_historiales ON historial_activaciones.id_historial_activacion = detalle_historiales.id_detalle_historial');
    res.render('historial_activacion/listar', { lista, showNavbar: true })
}


//traer datos
historial_activacionCtl.traer = async (req, res) => {
    const ids = req.params.id
    const lista = await sql.query('SELECT * FROM historial_activaciones INNER JOIN detalle_historial_activaciones ON historial_activaciones.id_historial_activacion = detalle_historial_activaciones.id_detalle_historial_activacion   where id_historial_activacion =?', [ids])
    //const listan = await sql.query('select *from  detalle_familiares  where id_detalle_familiar =?', [ids])
    res.render('historial_activacion/editar',{ lista, showNavbar: true })
}

historial_activacionCtl.actualizar = async (req, res) => {
    
    const id_activacion = req.params.idactivacion
    const id_detalle = req.params.iddetalle
    const {fecha_activacion, hora_activacion, ubicacion  } = req.body
    
    const nuevoEnvioFamiliar = {
        fecha_activacion, 
        hora_activacion, 
        ubicacion 
    }
    const nuevoEnvioDetalle = {
        //id_detalle_historial_activacion:id_detalle,
        hora_activacion, 
        ubicacion 
    }
    await orm.historial_activacion.findOne({ where: { id_historial_activacion: id_activacion } })
        .then(actualizar => {
            actualizar.update(nuevoEnvioFamiliar)
        })
    await orm.detalle_historial_activacion.findOne({ where: { id_detalle_historial_activacion: id_detalle } })
    .then(actualizar => {
        actualizar.update(nuevoEnvioDetalle)
    })
    req.flash('success', 'Actualizado exitosamente')
    res.redirect('/historial_activacion/listar/');
    
}

//Funciona
historial_activacionCtl.eliminar = async (req, res) => {
    const ids = req.params.id
    await orm.historial_activacion.destroy({ where: { id_historial_activacion: ids } }),
    await orm.detalle_historial_activacion.destroy({ where: { id_detalle_historial_activacion: ids } })
        .then(() => {
            req.flash('success', 'Eliminado exitosamente')
            res.redirect('/historial_activacion/listar/');
        })
}


module.exports = historial_activacionCtl