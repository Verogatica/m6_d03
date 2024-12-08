const express = require('express');
const cors = require('cors');
const app = express();
const { consultarPosts, agregarPost } = require('./consultas.js');

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.status(200).json({ success: true });
});

app.get('/posts', async (req, res) => {
    const data = await consultarPosts();
    res.status(200).json(data); 
});

app.post('/posts', async (req, res) => {
    const { titulo, img, descripcion, likes } = req.body;
    const result = await agregarPost(titulo, img, descripcion, likes);

    if (result.rowCount === 1) {
        res.status(201).json({ success: true, msg: "El post se insertó correctamente." });
    } else {
        res.status(500).json({ success: false, msg: "Error en la operación." });
    }
});

app.listen(3000, () => {
    console.log("Server is running on port 3000 :)");
});
