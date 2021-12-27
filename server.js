const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const app = express();
const url =
  "mongodb+srv://sjsumit:nodecluster@newscluster.kg7j4.mongodb.net/ResizeableAppDB?retryWrites=true&w=majority";
// const url = 'mongodb://127.0.0.1:27017/AlienDBex'
mongoose.connect(url, { useNewUrlParser: true });
const con = mongoose.connection;

con.on("open", () => {
  console.log("connected...");
});

app.use(express.json());

const addRouter = require("./routes/text");
const countRouter = require("./routes/countText");

app.use("/text", addRouter);
app.use("/count", countRouter);

if (process.env.NODE_ENV == "production") {
  app.use(express.static("client/build"));
  app.get("*", function (req, res) {
    res.sendFile(path.resolve(__dirname,"client","build", "index.html"));
  });
}

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log("Server started");
});
