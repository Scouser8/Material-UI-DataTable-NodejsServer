const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

// Create a new app & define its port or take it from the environment variables
// in case of deployment.
const app = express();
const port = process.env.PORT || 7999;

//Start the server listening on the above determined port.
let server = app.listen(port, () =>
  console.log(`Server running locally on port: ${port}`)
);

//DB config
const mongo_connectionURI =
  "mongodb+srv://madel96:xL96RvmcDgVBcgBt@datatable-moweex.uzwcp.mongodb.net/DataTableMoweex?retryWrites=true&w=majority";
const mongo_options = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  auto_reconnect: true,
};

//Connect to the database
mongoose
  .connect(mongo_connectionURI, mongo_options)
  .then(() => console.log("Connected to MongoDB Atlas"))
  .catch((err) => console.log("Atlas not responding"));

const db = mongoose.connection;

//Reconnect to database if connection lost.
db.on("error", (err) => {
  console.log("MongoDB disconnected!");
  mongoose.connect(mongo_connectionURI, mongo_options);
});

//Middlewares
app.use(bodyParser.json());
app.use(cors());

//Routing
app.use("/user", require("./Routes/UsersRoute.js"));
