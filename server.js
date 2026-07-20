const express = require('express');
const cors = require('cors');
const fs = require('fs');

const app = express();
app.use(cors());
app.use(express.json());

app.post('/api/usuarios', (req, res) => {
    const nuevoUsuario = req.body;
    // Leer usuarios existentes
    const usuarios = JSON.parse(fs.readFileSync('usuarios.json', 'utf8') || '[]');
    // Agregar el nuevo usuario
    usuarios.push(nuevoUsuario);
    // Guardar en el archivo
    fs.writeFileSync('usuarios.json', JSON.stringify(usuarios, null, 2));
    res.status(201).send("Usuario registrado");
});

// Leer productos desde un archivo JSON
const getProductos = () => {
    const data = fs.readFileSync('./productos.json', 'utf8');
    return JSON.parse(data);
};

app.get('/api/productos', (req, res) => {
    const productos = getProductos();
    res.json(productos);
});

app.listen(3000, '0.0.0.0', () => {
    console.log('Servidor corriendo en http://localhost:3000');
});