const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const employeesRoutes = require("./routes/employees.routes");
const departmentsRoutes = require("./routes/department.routes");
const workshopsRoutes = require("./routes/workshops.routes");
const staffingRoutes = require("./routes/stuffing.routes");
app.use(cors());

app.get("/", (req, res) => {
  res.send("Server is running");
});

app.use(express.json());

app.use("/employees", employeesRoutes);
app.use("/departments", departmentsRoutes);
app.use("/workshops", workshopsRoutes);
app.use("/staffing", staffingRoutes);

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log("server running on port", port);
});
