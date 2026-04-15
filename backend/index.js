const express = require('express');
const fs = require('fs-extra');
const mysql = require('mysql2');

const app = express();
const PORT = 3000;

app.use(express.json());

// Crear carpeta logs si no existe
fs.ensureDirSync('./logs');

// Función para escribir logs
function logMessage(message) {
    const timestamp = new Date().toISOString();
    const log = `[${timestamp}] ${message}\n`;
    fs.appendFileSync('./logs/app.log', log);
}

// 🔌 Conexión a MySQL
const db = mysql.createConnection({
    host: 'localhost',
    user: 'user',
    password: 'password',
    database: 'school_planner',
    port: 3307
});

db.connect(err => {
    if (err) {
        console.error('Error de conexión:', err);
        return;
    }
    console.log('Conectado a MySQL');
});

// Ruta de prueba
app.get('/', (req, res) => {
    logMessage('INFO: Acceso a ruta principal');
    res.send('Backend funcionando 🚀');
});

// 🟢 Crear tarea
app.post('/task', (req, res) => {
    const { title, subject, due_date } = req.body;

    const query = 'INSERT INTO tasks (title, subject, due_date) VALUES (?, ?, ?)';

    db.query(query, [title, subject, due_date], (err, result) => {
        if (err) {
            console.error(err);
            logMessage('ERROR: Fallo al guardar en DB');
            return res.status(500).send('Error al guardar tarea');
        }

        logMessage(`INFO: Tarea creada - ${title}`);

        res.json({ message: 'Tarea guardada correctamente' });
    });
});

// 🟢 Obtener tareas
app.get('/tasks', (req, res) => {
    db.query('SELECT * FROM tasks', (err, results) => {
        if (err) {
            console.error(err);
            logMessage('ERROR: Error al consultar tareas');
            return res.status(500).send('Error al obtener tareas');
        }

        logMessage('INFO: Consulta de tareas');

        res.json(results);
    });
});

// 🚀 Iniciar servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
