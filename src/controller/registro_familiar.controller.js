const registro_familiarCtl = {}
const sql = require('../Database/dataBase.sql')
const orm = require('../Database/dataBase.orm')

registro_familiarCtl.mostrar = (req, res) => {
    res.render('registro_familiar/agregar', { showNavbar: true });
}

//mandar
registro_familiarCtl.mandar = async (req, res) => {
    const id =req.id_registro_familiar  //ojo
    const { nombres,apellidos,correo_electronico,telefono } = req.body
    const nuevoEnvio = {
        nombres,
        apellidos,
        correo_electronico,
        telefono
 
    }
    await orm.registro_familiar.create(nuevoEnvio)
    await orm.detalle_familiar.create(nuevoEnvio)
    req.flash('success', 'Guardado exitosamente')
    res.redirect('/registro_familiar/listar/')
}

registro_familiarCtl.listar = async (req, res) => {
    const lista = await sql.query('SELECT * FROM registro_familiares INNER JOIN detalle_familiares ON registro_familiares.id_registro_familiar = detalle_familiares.id_detalle_familiar');
    res.render('registro_familiar/listar', { lista, showNavbar: true })
}


//traer datos
registro_familiarCtl.traer = async (req, res) => {
    const ids = req.params.id
    const lista = await sql.query('SELECT * FROM registro_familiares INNER JOIN detalle_familiares ON registro_familiares.id_registro_familiar = detalle_familiares.id_detalle_familiar   where id_registro_familiar =?', [ids])
    //const listan = await sql.query('select *from  detalle_familiares  where id_detalle_familiar =?', [ids])
    res.render('registro_familiar/editar',{ lista, showNavbar: true })
}

registro_familiarCtl.actualizar = async (req, res) => {
    
    const id_familiar = req.params.idfamiliar
    const id_detalle = req.params.iddetalle
    const {nombres,apellidos,correo_electronico,telefono } = req.body
    
    const nuevoEnvioFamiliar = {
        //id_registro_familiar:id_familiar,
        nombres,
        apellidos,
        correo_electronico,

        telefono
    }
    const nuevoEnvioDetalle = {
        //id_detalle_familiar:id_detalle,
        telefono
    }
    await orm.registro_familiar.findOne({ where: { id_registro_familiar: id_familiar } })
        .then(actualizar => {
            actualizar.update(nuevoEnvioFamiliar)
        })
    await orm.detalle_familiar.findOne({ where: { id_detalle_familiar: id_detalle } })
    .then(actualizar => {
        actualizar.update(nuevoEnvioDetalle)
    })
    req.flash('success', 'Actualizado exitosamente')
    res.redirect('/registro_familiar/listar/');
    
}

//Funciona
registro_familiarCtl.eliminar = async (req, res) => {
    const ids = req.params.id
    await orm.registro_familiar.destroy({ where: { id_registro_familiar: ids } }),
    await orm.detalle_familiar.destroy({ where: { id_detalle_familiar: ids } })
        .then(() => {
            req.flash('success', 'Eliminado exitosamente')
            res.redirect('/registro_familiar/listar/');
        })
}


module.exports = registro_familiarCtl