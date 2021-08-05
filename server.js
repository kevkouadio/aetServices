const express = require("express");
const initDb = require("./config/initDb");
const mongoose = require("mongoose");
const routes = require("./routes");
const app = express();
const PORT = process.env.PORT || 3001;

// Define middleware here
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}
//app.use(express.static(__dirname))
// not found in static files, so default to index.html
//app.use((req, res) => res.sendFile(`${__dirname}/index.html`))
// Add routes, both API and view
app.use(routes);

initDb();
// Connect to the Mongo DB
//mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/aetServices");

// Start the API server
app.listen(PORT, function() {
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});
