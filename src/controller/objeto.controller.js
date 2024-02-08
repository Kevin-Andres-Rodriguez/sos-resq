const objetoCtl = {}
const sql = require('../Database/dataBase.sql')
const orm = require('../Database/dataBase.orm')

objetoCtl.mostrar = (req, res) => {
    res.render('objeto/agregar', { showNavbar: true });
}

//mandar
objetoCtl.mandar = async (req, res) => {
    const id =req.id_objeto  //ojo
    const { marca,modelo,numero_serie,numero_contacto,correo_objeto,fecha_perdida,hora_perdida,ubicacion_perdida,color } = req.body
    const nuevoEnvio = {
        marca,
        modelo,
        numero_serie,
        numero_contacto,
        correo_objeto,
        fecha_perdida,
        hora_perdida,
        ubicacion_perdida,
        color
 
    }
    await orm.objeto.create(nuevoEnvio)
    await orm.detalle_objeto.create(nuevoEnvio)
    req.flash('success', 'Guardado exitosamente')
    res.redirect('/objeto/listar/')
}

objetoCtl.listar = async (req, res) => {
    const lista = await sql.query('SELECT * FROM objetos INNER JOIN detalle_objetos ON objetos.id_objeto = detalle_objetos.id_detalle_objeto');
    res.render('objeto/listar', { lista, showNavbar: true })
}


//traer datos
objetoCtl.traer = async (req, res) => {
    const ids = req.params.id
    const lista = await sql.query('SELECT * FROM objetos INNER JOIN detalle_objetos ON objetos.id_objeto = detalle_objetos.id_detalle_objeto   where id_objeto =?', [ids])
    //const listan = await sql.query('select *from  detalle_familiares  where id_detalle_familiar =?', [ids])
    res.render('objeto/editar',{ lista, showNavbar: true })
}

objetoCtl.actualizar = async (req, res) => {
    
    const id_objeto = req.params.idobjeto
    const id_detalle = req.params.iddetalle
    const {  marca, modelo,numero_serie,numero_contacto,correo_objeto,fecha_perdida,hora_perdida,ubicacion_perdida,color  } = req.body
    const nuevoEnvioObjeto = {
        //id_registro_familiar:id_familiar,
        marca,
        modelo,
        numero_serie,
        numero_contacto,
        correo_objeto,
        fecha_perdida,
        hora_perdida,
        ubicacion_perdida,
        color 
    }
    const nuevoEnvioDetalle = {
        //id_detalle_objeto:id_detalle,
        fecha_perdida,
        hora_perdida,
        ubicacion_perdida,
        color 
    }
    await orm.objeto.findOne({ where: { id_objeto: id_objeto } })
        .then(actualizar => {
            actualizar.update(nuevoEnvioObjeto)
        })
    await orm.detalle_objeto.findOne({ where: { id_detalle_objeto: id_detalle } })
    .then(actualizar => {
        actualizar.update(nuevoEnvioDetalle)
    })
    req.flash('success', 'Actualizado exitosamente')
    res.redirect('/objeto/listar/');
    
}

//Funciona
objetoCtl.eliminar = async (req, res) => {
    const ids = req.params.id
    await orm.objeto.destroy({ where: { id_objeto: ids } }),
    await orm.detalle_objeto.destroy({ where: { id_detalle_objeto: ids } })
        .then(() => {
            req.flash('success', 'Eliminado exitosamente')
            res.redirect('/objeto/listar/');
        })
}


module.exports = objetoCtl