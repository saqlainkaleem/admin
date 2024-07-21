const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

const categories = [
	{
		id: 123,
		name: "Dal & Pulses",
		image: "https://via.placeholder.com/50",
		status: "Active",
		sequence: 1,
	},
	{
		id: 124,
		name: "Ghee & Oils",
		image: "https://via.placeholder.com/50",
		status: "Inactive",
		sequence: 2,
	},
	{
		id: 125,
		name: "Tea",
		image: "https://via.placeholder.com/50",
		status: "Inactive",
		sequence: 3,
	},
	{
		id: 126,
		name: "Atta & Flours",
		image: "https://via.placeholder.com/50",
		status: "Inactive",
		sequence: 3,
	},
];

app.get("/categories", (req, res) => {
	res.json({ categories });
});

app.get("/categories/:id", (req, res) => {
	const id = parseInt(req.params.id, 10);
	const category = categories.find((cat) => cat.id === id);

	if (category) {
		res.json(category);
	} else {
		res.status(404).json({ message: "Category not found" });
	}
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
