import { pool } from "../config/db.js";
import { supabase } from "../config/superbase.js";

export const getAllUsers = async (_req, res) => {
  try {
    const result = await pool.query("SELECT * FROM users");
    res.json(result.rows);
  } catch (err) {
    console.error("Error fetching all users:", err);
    res.status(500).json({ error: err.message });
  }
};

export const getAllUserProfiles = async (req, res) => {
  try {
    const { data } = await supabase.from("users").select(`
    first_name,
    last_name,
    email,
    profile_picture,
    user_profiles ( date_of_birth, bio )
  `);
    res.json(data);
  } catch (err) {
    console.error("Error fetching all user profiles:", err);
    res.status(500).json({ error: err.message });
  }
};

export const getUsersAlphabetical = async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM users ORDER BY last_name ASC"
    );
    res.json(result.rows);
  } catch (err) {
    console.error("Error fetching users alphabetically:", err);
    res.status(500).json({ error: err.message });
  }
};

export const getUsersEmailCount = async (req, res) => {
  try {
    const result = await pool.query("SELECT COUNT(*) FROM users");
    res.json(result.rows[0]);
  } catch (err) {
    console.error("Error getting email count:", err);
    res.status(500).json({ error: err.message });
  }
};

export const createUsers = async (req, res) => {
  try {
    const { first_name, last_name, email } = req.body;

    const queryText = `
      INSERT INTO users(first_name, last_name, email) 
      VALUES($1, $2, $3) 
      RETURNING *
    `;
    const values = [first_name, last_name, email];

    const result = await pool.query(queryText, values);
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error("Error creating user:", err);
    res.status(500).json({ error: err.message });
  }
};
