const personaCtl = {}
const sql = require('../Database/dataBase.sql')
const orm = require('../Database/dataBase.orm')

personaCtl.mostrar = (req, res) => {
    res.render('persona/agregar', { showNavbar: true });
}

//mandar
personaCtl.mandar = async (req, res) => {
    const id =req.id_persona  //ojo
    const { nombres, apellidos, fecha_nacimiento, sex, direccion, correo_persona, numero_persona } = req.body
    const nuevoEnvio = {
        nombres, 
        apellidos, 
        fecha_nacimiento, 
        sex, 
        direccion, 
        correo_persona, 
        numero_persona
 
    }
    await orm.persona.create(nuevoEnvio)
    await orm.detalle_persona.create(nuevoEnvio)
    req.flash('success', 'Guardado exitosamente')
    res.redirect('/persona/listar/')
}

personaCtl.listar = async (req, res) => {
    const lista = await sql.query('SELECT * FROM personas INNER JOIN detalle_personas ON personas.id_persona = detalle_personas.id_detalle_persona');
    res.render('persona/listar', { lista, showNavbar: true })
}


//traer datos
personaCtl.traer = async (req, res) => {
    const ids = req.params.id
    const lista = await sql.query('SELECT * FROM personas INNER JOIN detalle_personas ON personas.id_persona = detalle_personas.id_detalle_persona   where id_persona =?', [ids])
    //const listan = await sql.query('select *from  detalle_familiares  where id_detalle_familiar =?', [ids])
    res.render('persona/editar',{ lista, showNavbar: true })
}

personaCtl.actualizar = async (req, res) => {
    
    const id_persona = req.params.idpersona
    const id_detalle = req.params.iddetalle
    const {nombres, apellidos, fecha_nacimiento, sex, direccion, correo_persona, numero_persona} = req.body
    
    const nuevoEnvioPersona = {
        //id_persona:id_persona,
        nombres, 
        apellidos, 
        fecha_nacimiento, 
        sex, 
        direccion, 
        correo_persona, 
        numero_persona
    }
    const nuevoEnvioDetalle = {
        //id_detalle_persona:id_detalle,
        numero_persona
    }
    await orm.persona.findOne({ where: { id_persona: id_persona } })
        .then(actualizar => {
            actualizar.update(nuevoEnvioPersona)
        })
    await orm.detalle_persona.findOne({ where: { id_detalle_persona: id_detalle } })
    .then(actualizar => {
        actualizar.update(nuevoEnvioDetalle)
    })
    req.flash('success', 'Actualizado exitosamente')
    res.redirect('/persona/listar/');
    
}

//Funciona
personaCtl.eliminar = async (req, res) => {
    const ids = req.params.id
    await orm.persona.destroy({ where: { id_persona: ids } }),
    await orm.detalle_persona.destroy({ where: { id_detalle_persona: ids } })
        .then(() => {
            req.flash('success', 'Eliminado exitosamente')
            res.redirect('/persona/listar/');
        })
}


module.exports = personaCtl