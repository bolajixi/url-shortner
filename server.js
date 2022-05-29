const dotenv = require("dotenv");

const express = require("express");
const app = express();

const mongoose = require("mongoose");
const shortUrl = require("./models/shortUrls");
const shortId = require("shortid");

dotenv.config()

mongoose
	.connect(process.env.MONGO_DB, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => console.log("Connected to Atlas DB"))
	.catch(() => new Error("Could not connect to database"));

app.use(express.urlencoded({ extended: false }));

// Set view engine
app.set("view engine", "ejs");

app.get("/", async (req, res) => {
	const shortUrls = await shortUrl.find();
	res.render("index", { shortUrlsList: shortUrls });
});

app.post("/shortUrls", async (req, res) => {
	const id = shortId.generate();

	await shortUrl.create({
		fullUrl: req.body.fullURL,
		shortUrl: id,
		expandedShortUrl: `${req.headers.host}/${id}`,
	});
	res.redirect("/");
});

app.get("/:shortUrl", async (req, res) => {
	const _shortUrl = await shortUrl.findOne({ shortUrl: req.params.shortUrl });
	if (_shortUrl == null) return res.sendStatus(404);

	_shortUrl.clicks++;
	_shortUrl.save();

	res.redirect(_shortUrl.fullUrl);
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server started on port ${port}...`));
