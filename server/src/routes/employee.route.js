const { Router } = require("express");

const {
	createEmployee,
	getById,
	getAllEmployee,
	updateEmployee,
	deleteEmployee,
} = require("../controllers/employee.controller");

const employeeRouter = Router();

// CREATE
employeeRouter.post("/", createEmployee);

// READ all
employeeRouter.get("/", getAllEmployee);

// READ by ID
employeeRouter.get("/:id", getById);

// UPDATE
employeeRouter.put("/:id", updateEmployee);

// DELETE
employeeRouter.delete("/:id", deleteEmployee);

module.exports = employeeRouter;
