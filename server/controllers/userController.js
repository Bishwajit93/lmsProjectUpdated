import pool from '../config/db.js';

export const registerUser = async (req, res) => {
  const { firstName, lastName, username, email, institutionName, password } = req.body;

  try {
    const newUser = await pool.query(
      `INSERT INTO users (first_name, last_name, username, email, institution_name, password)
      VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
      [firstName, lastName, username, email, institutionName, password]
    );

    res.json(newUser.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};
