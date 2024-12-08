const { Pool } = require('pg');

const pool = new Pool({
    host: 'localhost',
    user: 'postgres',    
    password: 'postgres', 
    database: 'likeme',  
    allowExitOnIdle: true
});

const consultarPosts = async () => {
   const result = await pool.query("SELECT * FROM posts;");
   return result.rows; 
}

const agregarPost = async (titulo, img, descripcion, likes) => {
    const query = "INSERT INTO posts (titulo, img, descripcion, likes) VALUES ($1, $2, $3, $4) RETURNING *";
    const values = [titulo, img, descripcion, likes];
    const result = await pool.query(query, values);
    return result;  
}

module.exports = { consultarPosts, agregarPost };
