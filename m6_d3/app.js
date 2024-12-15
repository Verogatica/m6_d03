const express = require('express');
const cors = require('cors');
const app = express();

const { consultarPosts, agregarPost, modificarPost, consultarPostDetalle, eliminarPost } = require('./controllers/postsController.js');

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    try {
        res.status(200).json({success:true});
    } catch(e) {
        res.status(500).send(e.message);
    }
});

app.get('/posts', async (req, res) => {
    await consultarPosts(req, res);

});

app.get('/posts/:id', async (req, res) => {
    await consultarPostDetalle(req, res);

});

app.post('/posts', async (req, res) => {
    await agregarPost(req, res)
});

app.put('/posts/:id', async (req, res) => {
    await modificarPost(req, res);
});

app.delete('/posts/:id', async (req, res) => {
    await eliminarPost(req,res);
});

app.listen(3000, () => {
    console.log("Server is running on port 3000 :)");
});