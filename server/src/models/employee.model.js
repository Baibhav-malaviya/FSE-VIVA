const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema({
	employeeName: { type: String, required: true },
	department: { type: String, required: true },
	contactNumber: { type: String, required: true },
	designation: { type: String, required: true },
});

module.exports = mongoose.model("Employee", employeeSchema);
