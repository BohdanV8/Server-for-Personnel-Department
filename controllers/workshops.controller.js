const pool = require("../db");

class WorkshopsController {
  static async getAllWorkshops(req, res) {
    try {
      const { rows } = await pool.query("SELECT * FROM workshops");
      res.json(rows);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  static async createWorkshop(req, res) {
    const { workshop_name } = req.body;
    try {
      const { rows } = await pool.query(
        "INSERT INTO workshops (workshop_name) VALUES ($1) RETURNING *",
        [workshop_name]
      );
      res.status(201).json(rows[0]);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  static async updateWorkshop(req, res) {
    const { id } = req.params;
    const { workshop_name } = req.body;
    try {
      const { rows } = await pool.query(
        "UPDATE workshops SET workshop_name = $1 WHERE id = $2 RETURNING *",
        [workshop_name, id]
      );
      if (rows.length === 0) {
        return res.status(404).json({ message: "Workshop not found" });
      }
      res.json(rows[0]);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  static async deleteWorkshop(req, res) {
    const { id } = req.params;
    try {
      const { rows } = await pool.query(
        "DELETE FROM workshops WHERE id = $1 RETURNING *",
        [id]
      );
      if (rows.length === 0) {
        return res.status(404).json({ message: "Workshop not found" });
      }
      res.json({ message: "Workshop deleted successfully" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Internal server error" });
    }
  }
}

module.exports = WorkshopsController;
