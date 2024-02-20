const Router = require("express");
const router = new Router();
const StaffingController = require("../controllers/stuffing.controller");

router.get("/", StaffingController.getAllStaffing);
router.post("/", StaffingController.createStaffing);
router.put("/:id", StaffingController.updateStaffing);
router.delete("/:id", StaffingController.deleteStaffing);

module.exports = router;
