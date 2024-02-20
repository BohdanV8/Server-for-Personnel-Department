const pool = require("../db");

class DepartmentsController {
  static async getAllDepartments(req, res) {
    try {
      const { rows } = await pool.query("SELECT * FROM departments");
      res.json(rows);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  static async createDepartment(req, res) {
    const { department_name } = req.body;
    try {
      const { rows } = await pool.query(
        "INSERT INTO departments (department_name) VALUES ($1) RETURNING *",
        [department_name]
      );
      res.status(201).json(rows[0]);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  static async updateDepartment(req, res) {
    const { id } = req.params;
    const { department_name } = req.body;
    try {
      const { rows } = await pool.query(
        "UPDATE departments SET department_name = $1 WHERE id = $2 RETURNING *",
        [department_name, id]
      );
      if (rows.length === 0) {
        return res.status(404).json({ message: "Department not found" });
      }
      res.json(rows[0]);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  static async deleteDepartment(req, res) {
    const { id } = req.params;
    try {
      const { rows } = await pool.query(
        "DELETE FROM departments WHERE id = $1 RETURNING *",
        [id]
      );
      if (rows.length === 0) {
        return res.status(404).json({ message: "Department not found" });
      }
      res.json({ message: "Department deleted successfully" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Internal server error" });
    }
  }
}

module.exports = DepartmentsController;
