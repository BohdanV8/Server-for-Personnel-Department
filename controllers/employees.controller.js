const pool = require("../db");

class EmployeesController {
  static async getAllEmployees(req, res) {
    try {
      const { rows } = await pool.query("SELECT * FROM employees");
      res.json(rows);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  static async createEmployee(req, res) {
    const {
      first_name,
      last_name,
      department_id,
      position,
      salary,
      hire_date,
    } = req.body;
    try {
      const { rows } = await pool.query(
        "INSERT INTO employees (first_name, last_name, department_id, position, salary, hire_date) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
        [first_name, last_name, department_id, position, salary, hire_date]
      );
      res.status(201).json(rows[0]);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  static async updateEmployee(req, res) {
    const { id } = req.params;
    const {
      first_name,
      last_name,
      department_id,
      position,
      salary,
      hire_date,
    } = req.body;
    try {
      const { rows } = await pool.query(
        "UPDATE employees SET first_name = $1, last_name = $2, department_id = $3, position = $4, salary = $5, hire_date = $6 WHERE id = $7 RETURNING *",
        [first_name, last_name, department_id, position, salary, hire_date, id]
      );
      if (rows.length === 0) {
        return res.status(404).json({ message: "Employee not found" });
      }
      res.json(rows[0]);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  static async deleteEmployee(req, res) {
    const { id } = req.params;
    try {
      const { rows } = await pool.query(
        "DELETE FROM employees WHERE id = $1 RETURNING *",
        [id]
      );
      if (rows.length === 0) {
        return res.status(404).json({ message: "Employee not found" });
      }
      res.json({ message: "Employee deleted successfully" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Internal server error" });
    }
  }
}

module.exports = EmployeesController;
