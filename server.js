const express = require("express");
const app = express();

const mongoose = require("mongoose");
const shortUrl = require("./models/shortUrls");

mongoose.connect("mongodb://localhost/urlShortner", {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});

app.use(express.urlencoded({ extended: false }));

// Set view engine
app.set("view engine", "ejs");

app.get("/", async (req, res) => {
	const shortUrls = await shortUrl.find();
	res.render("index", { shortUrls: shortUrls });
});

app.post("/shortUrls", async (req, res) => {
	await shortUrl.create({
		fullUrl: req.body.fullURL,
	});
	res.redirect("/");
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server started on port ${port}...`));
