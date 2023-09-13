import { validationResult } from 'express-validator';
import pool from '../config/db.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';


export const registerUser = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { firstName, lastName, username, email, institutionName, password } = req.body;

    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = await pool.query(
        `INSERT INTO users (first_name, last_name, username, email, institution_name, password)
        VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
        [firstName, lastName, username, email, institutionName, hashedPassword]
        );

        res.json(newUser.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
};


export const loginUser = async (req, res) => {
    const { email, password } = req.body;
  
    try {
      const user = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
  
      if (user.rows.length === 0) {
        return res.status(401).json("Invalid Credential");
      }
  
      const validPassword = await bcrypt.compare(password, user.rows[0].password);
  
      if (!validPassword) {
        return res.status(401).json("Invalid Credential");
      }
      console.log(process.env.JWT_SECRET)
      const jwtToken = jwt.sign(
        { user_id: user.rows[0].id },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      );
  
      return res.json({ jwtToken });
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  };