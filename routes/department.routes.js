const Router = require("express");
const router = new Router();

const DepartmentsController = require("../controllers/departments.controller");

router.get("/", DepartmentsController.getAllDepartments);
router.post("/", DepartmentsController.createDepartment);
router.put("/:id", DepartmentsController.updateDepartment);
router.delete("/:id", DepartmentsController.deleteDepartment);

module.exports = router;
