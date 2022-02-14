const express = require("express");
const app = express();

app.get("/", (req, res) => {
	res.send("Hello world");
});

// Set view engine
app.set("view enine", "ejs");

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server started on port ${port}...`));
