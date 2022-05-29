const mongoose = require("mongoose");
const shortId = require("shortid");

const shortUrlSchema = new mongoose.Schema({
	fullUrl: {
		type: String,
		required: true,
	},
	shortUrl: {
		type: String,
		required: true,
	},
	expandedShortUrl: {
		type: String,
		required: true,
	},
	clicks: {
		type: Number,
		required: true,
		default: 0,
	},
	expireAt: {
		type: Date,
		default: Date.now,
		index: { expires: "5m" },
	},
});

module.exports = mongoose.model("ShortUrl", shortUrlSchema);
