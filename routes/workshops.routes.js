const Router = require("express");
const router = new Router();

const WorkshopsController = require("../controllers/workshops.controller");

router.get("/", WorkshopsController.getAllWorkshops);
router.post("/", WorkshopsController.createWorkshop);
router.put("/:id", WorkshopsController.updateWorkshop);
router.delete("/:id", WorkshopsController.deleteWorkshop);

module.exports = router;
