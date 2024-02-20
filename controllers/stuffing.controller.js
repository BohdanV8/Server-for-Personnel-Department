const pool = require("../db");

class StaffingController {
  static async getAllStaffing(req, res) {
    try {
      const { rows } = await pool.query("SELECT * FROM staffing");
      res.json(rows);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  static async createStaffing(req, res) {
    const { department_id, workshop_id, employee_id, position } = req.body;
    try {
      const { rows } = await pool.query(
        "INSERT INTO staffing (department_id, workshop_id, employee_id, position) VALUES ($1, $2, $3, $4) RETURNING *",
        [department_id, workshop_id, employee_id, position]
      );
      res.status(201).json(rows[0]);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  static async updateStaffing(req, res) {
    const { id } = req.params;
    const { department_id, workshop_id, employee_id, position } = req.body;
    try {
      const { rows } = await pool.query(
        "UPDATE staffing SET department_id = $1, workshop_id = $2, employee_id = $3, position = $4 WHERE id = $5 RETURNING *",
        [department_id, workshop_id, employee_id, position, id]
      );
      if (rows.length === 0) {
        return res.status(404).json({ message: "Staffing entry not found" });
      }
      res.json(rows[0]);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  static async deleteStaffing(req, res) {
    const { id } = req.params;
    try {
      const { rows } = await pool.query(
        "DELETE FROM staffing WHERE id = $1 RETURNING *",
        [id]
      );
      if (rows.length === 0) {
        return res.status(404).json({ message: "Staffing entry not found" });
      }
      res.json({ message: "Staffing entry deleted successfully" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Internal server error" });
    }
  }
}

module.exports = StaffingController;
