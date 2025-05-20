const express = require("express");
const cors = require("cors");
const connectDB = require("./config/connect");
require("dotenv").config();

connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
	res.send("API is running...");
});

app.listen(PORT, () => {
	console.log(`Server running on http://localhost:${PORT}`);
});
