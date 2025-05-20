const Employee = require("../models/employee.model");

const createEmployee = async (req, res) => {
	try {
		if (!req.body) return res.status.json({ message: "form is empty" });

		const newEmployee = new Employee(req.body);
		await newEmployee.save();
		res.status(201).json(newEmployee);
	} catch (err) {
		res.status(400).json({ error: err.message });
	}
};

const getAllEmployee = async (req, res) => {
	try {
		const employees = await Employee.find();
		res.json(employees);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};

const getById = async (req, res) => {
	try {
		const employee = await Employee.findById(req.params.id);
		if (!employee) return res.status(404).json({ message: "Not Found" });
		res.json(employee);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};

const updateEmployee = async (req, res) => {
	try {
		const updated = await Employee.findByIdAndUpdate(req.params.id, req.body, {
			new: true,
			runValidators: true,
		});
		if (!updated)
			return res.status(404).json({ message: "Employee Not Found" });
		res.json(updated);
	} catch (err) {
		res.status(400).json({ error: err.message });
	}
};

const deleteEmployee = async (req, res) => {
	try {
		const deleted = await Employee.findByIdAndDelete(req.params.id);
		if (!deleted) return res.status(404).json({ message: "Not Found" });
		res.json({ message: "Deleted Successfully" });
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};

module.exports = {
	createEmployee,
	getAllEmployee,
	getById,
	updateEmployee,
	deleteEmployee,
};
