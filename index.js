import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import Form from "./model/form.js";

const app = express();

dotenv.config();

app.use(cors());
// app.use(express.urlencoded({ extended: false }));
app.use(express.json());

mongoose
	.connect(process.env.MONGODB_URL)
	.then(() => {
		console.log("dB connection is succesfull");
	})
	.catch((err) => console.log(err));

app.get("/", (req, res) => {
	res.send({ Yoo: "working fine" });
});

// {
//     "firstName":"Harsh",
//     "lastName":"Goyal",
//     "phone":"9588549901",
//     "gender":"male",
//     "year":2003,
//     "school":"Chitkara",
//     "bio":"front end developer"
// } 

app.post("/formSubmit", async (req, res) => {
	console.log(req.body);
	const newForm = new Form({
		firstName: req.body.fName,
		lastName: req.body.lName,
		phone: req.body.phone,
		gender: req.body.gender,
		year: req.body.year,
		school: req.body.school,
		email: req.body.email,
		participation:req.body.participation
	});
	try {
		const savedForm = await newForm.save();
		console.log(savedForm);
		res.status(200).json(savedForm);
	} catch (error) {
		console.log(error.message);
		res.status(500).json(error);
	}
	// res.send("Yoo success");
});

app.listen(9000, () => {
	console.log("Backend server is runnning on PORT " + "9000");
});
