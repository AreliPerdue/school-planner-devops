const express = require('express');
const fs = require('fs-extra');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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
    host: 'db',
    user: 'user',
    password: 'password',
    database: 'school_planner',
    port: 3306
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
    res.send("Backend funcionando 🚀");
});

// ✏️ Actualizar tarea
app.put('/task/:id', (req, res) => {
    const { id } = req.params;
    const { title, subject, due_date } = req.body;

    const query = 'UPDATE tasks SET title = ?, subject = ?, due_date = ? WHERE id = ?';

    db.query(query, [title, subject, due_date, id], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Error al actualizar tarea');
        }

        res.json({ message: 'Tarea actualizada' });
    });
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

// ❌ Eliminar tarea
app.delete('/task/:id', (req, res) => {
    const { id } = req.params;

    const query = 'DELETE FROM tasks WHERE id = ?';

    db.query(query, [id], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Error al eliminar tarea');
        }

        res.json({ message: 'Tarea eliminada' });
    });
});

// 🚀 Iniciar servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
