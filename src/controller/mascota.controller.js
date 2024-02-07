const mascotaCtl = {}
const sql = require('../Database/dataBase.sql')
const orm = require('../Database/dataBase.orm')

mascotaCtl.mostrar = (req, res) => {
    res.render('mascota/agregar', { showNavbar: true });
}

//mandar
mascotaCtl.mandar = async (req, res) => {
    const id =req.id_mascota  //ojo
    const { nombre_mascota, especie, raza, altura, peso, numero_telefonico, medicamentos, direccion_mascota, fecha_vacuna, nombre_propietario    } = req.body
    const nuevoEnvio = {
        nombre_mascota, 
        especie, 
        raza, 
        altura, 
        peso, 
        numero_telefonico, 
        medicamentos, 
        direccion_mascota, 
        fecha_vacuna, 
        nombre_propietario
 
    }
    await orm.mascota.create(nuevoEnvio)
    await orm.detalle_mascota.create(nuevoEnvio)
    req.flash('success', 'Guardado exitosamente')
    res.redirect('/mascota/listar/')
}

mascotaCtl.listar = async (req, res) => {
    const lista = await sql.query('SELECT * FROM mascotas INNER JOIN detalle_mascotas ON mascotas.id_mascota = detalle_mascotas.id_detalle_mascota');
    res.render('mascota/listar', { lista, showNavbar: true })
}


//traer datos
mascotaCtl.traer = async (req, res) => {
    const ids = req.params.id
    const lista = await sql.query('SELECT * FROM mascotas INNER JOIN detalle_mascotas ON mascotas.id_mascota = detalle_mascotas.id_detalle_mascota  where id_mascota =?', [ids])
    //const listan = await sql.query('select *from  detalle_familiares  where id_detalle_familiar =?', [ids])
    res.render('mascota/editar',{ lista, showNavbar: true })
}

mascotaCtl.actualizar = async (req, res) => {
    
    const id_mascota = req.params.idmascota
    const id_detalle = req.params.iddetalle
    const {nombre_mascota, especie, raza, altura, peso, numero_telefonico, medicamentos, direccion_mascota, fecha_vacuna, nombre_propietario} = req.body
    
    const nuevoEnvioMascota = {
        //id_registro_familiar:id_familiar,
        nombre_mascota, 
        especie, 
        raza, 
        altura, 
        peso, 
        numero_telefonico, 
        medicamentos, 
        direccion_mascota, 
        fecha_vacuna, 
        nombre_propietario
    }
    const nuevoEnvioDetalle = {
        //id_detalle_familiar:id_detalle,
        numero_telefonico, 
        medicamentos, 
        direccion_mascota, 
        fecha_vacuna, 
        nombre_propietario
    }
    await orm.mascota.findOne({ where: { id_mascota : id_mascota } })
        .then(actualizar => {
            actualizar.update(nuevoEnvioMascota)
        })
    await orm.detalle_familiar.findOne({ where: { id_detalle_mascota: id_detalle } })
    .then(actualizar => {
        actualizar.update(nuevoEnvioDetalle)
    })
    req.flash('success', 'Actualizado exitosamente')
    res.redirect('/mascota/listar/');
    
}

//Funciona
mascotaCtl.eliminar = async (req, res) => {
    const ids = req.params.id
    await orm.mascota.destroy({ where: { id_mascota: ids } }),
    await orm.detalle_mascota.destroy({ where: { id_detalle_mascota: ids } })
        .then(() => {
            req.flash('success', 'Eliminado exitosamente')
            res.redirect('/mascota/listar/');
        })
}


module.exports = mascotaCtl