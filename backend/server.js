const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true });
const connection = mongoose.connection;
connection.once("open", (err) => {
	if (err) throw err;
	console.log("MongoDB connection established sucessfully");
});

const exercisesRouter = require("./routes/exercises");
const userRouter = require("./routes/users");

app.use("/exercises", exercisesRouter);
app.use("/users", userRouter);

app.listen(port, (err) => {
	if (err) throw err;
	console.log(`listening on port ${port}...`);
});