const { 
    agregarPostBD, 
    consultarPostsBD, 
    consultarPostDetalleBD, 
    actualizarPostBD, 
    eliminarPostBD 
} = require("../models/postsModel.js");

const consultarPosts = async (req, res) => {
    try {
        const data = await consultarPostsBD();
        return res.status(200).json(data); 
    } catch (error) {
        return res.status(500).send(error.message);
    }
};

const agregarPost = async (req, res) => {
    try {
        const { titulo = "", img = "", descripcion = "", likes = 0 } = req.body;

        await agregarPostBD(titulo, img, descripcion, likes);

        const posts = await consultarPostsBD();
        const nuevoPost = posts[posts.length - 1]; 
        return res.status(201).json(nuevoPost); 
    } catch (error) {
        return res.status(500).json({ msg: error.message });
    }
};

const modificarPost = async (req, res) => {
    try {
        const { likes } = req.body; 
        const { id } = req.params;  

        if (isNaN(likes) || likes < 0) {
            return res.status(400).json({ msg: "El valor de 'likes' es inválido" });
        }

        const data = await actualizarPostBD(likes, id);

        if (data.status === false) {
            return res.status(404).json({ msg: "Post no encontrado" });
        }

        return res.status(200).json(data); 
    } catch (error) {
        return res.status(500).json({ msg: error.message });
    }
};

const consultarPostDetalle = async (req, res) => {
    try {
        const { id } = req.params;
        const data = await consultarPostDetalleBD(id);
        return res.status(200).json(data); 
    } catch (error) {
        return res.status(500).send(error.message);
    }
};

const eliminarPost = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ msg: "Falta el ID del post" });
        }

        const data = await eliminarPostBD(id);
        if (!data.status) {
            return res.status(404).json({ msg: "Post no encontrado" });
        }

        return res.status(200).json(data); 
    } catch (error) {
        return res.status(500).send(error.message);
    }
};

module.exports = { consultarPosts, agregarPost, modificarPost, consultarPostDetalle, eliminarPost };
