const express = require("express");
const app = express();

const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/urlShortner", {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});

// Set view engine
app.set("view engine", "ejs");

app.get("/", (req, res) => {
	res.render("index");
});

app.post("/shortUrls", (req, res) => {});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server started on port ${port}...`));
