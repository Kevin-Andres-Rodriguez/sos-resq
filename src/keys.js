// Configuración de variables de entorno para la conexión a la base de datos MySQL
const MYSQLHOST = process.env.MYSQLHOST || 'localhost'; // Host de la base de datos
const MYSQLUSER = process.env.MYSQLUSER || 'root'; // Usuario de la base de datos
const MYSQLPASSWORD = process.env.MYSQLPASSWORD || ''; // Contraseña de la base de datos
const MYSQLDATABASE = process.env.MYSQLDATABASE || 'sos_a'; // Nombre de la base de datos
const MYSQLPORT = process.env.MYSQLPORT || 3306 // Puerto de la base de datos
const MYSQL_URI = process.env.MYSQL_URI || ''; // URI de conexión a la base de datos (si es necesario)

// " http://localhost:8080/dashboard/ " para la base de datos MySQL  en caso de puerto 8080

// Exportar las variables de configuración
module.exports = {
    MYSQLHOST,
    MYSQLUSER,
    MYSQLPASSWORD,
    MYSQLDATABASE,
    MYSQLPORT,
    MYSQL_URI
};