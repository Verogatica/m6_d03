const pool = require("../db/conexion.js");

const agregarPostBD = async (titulo, img, descripcion, likes) => {
    const query = "INSERT INTO posts (id, titulo, img, descripcion, likes) VALUES (DEFAULT, $1, $2, $3, $4)";
    const values = [titulo, img, descripcion, likes];
    return await pool.query(query, values);
};

const consultarPostsBD = async () => {
    const consulta = "SELECT * FROM posts;";
    const { rows, rowCount } = await pool.query(consulta);
    return rows;
};

const consultarPostDetalleBD = async (id) => {
    const consulta = "SELECT * FROM posts WHERE id = $1";
    const { rows } = await pool.query(consulta, [id]);
    return rows[0];
};

const actualizarPostBD = async (likes, id) => {
    const consulta = "UPDATE posts SET likes = $1 WHERE id = $2";
    const values = [likes, id];
    const { rowCount } = await pool.query(consulta, values);

    if (rowCount === 1) {
        return consultarPostDetalleBD(id);
    }
    return { status: false };
};

const eliminarPostBD = async (id) => {
    const consulta = "DELETE FROM posts WHERE id=$1";
    const values = [id];
    const { rowCount } = await pool.query(consulta, values);

    if (rowCount === 1) {
        return { status: true, msg: "Post eliminado con éxito" };
    }

    return { status: false };
};

module.exports = {
    agregarPostBD,
    consultarPostsBD,
    actualizarPostBD,
    consultarPostDetalleBD,
    eliminarPostBD
};
