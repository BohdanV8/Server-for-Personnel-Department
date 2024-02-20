const Router = require("express");
const router = new Router();
const EmployeesController = require("../controllers/employees.controller");

router.get("/", EmployeesController.getAllEmployees);
router.post("/", EmployeesController.createEmployee);
router.put("/:id", EmployeesController.updateEmployee);
router.delete("/:id", EmployeesController.deleteEmployee);

module.exports = router;
