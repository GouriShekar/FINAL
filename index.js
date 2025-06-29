var express = require("express");
var app = express();
require("./connection");
var BlogModel = require("./model");
var cors = require("cors");
app.use(express.json());
app.use(cors());

var PORT = 3001;

app.get("/get", async (req, res) => {
  try {
    const data = await BlogModel.find();
    res.send(data);
  } catch (error) {
    console.log(error);
    res.status(500).send("Error fetching data");
  }
});


app.post("/add", async (req, res) => {
  try {
    await BlogModel(req.body).save();
    res.send({ message: "Data Added" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Error adding data" });
  }
});


app.delete("/:id", async (req, res) => {
  console.log(req.params.id);
  try {
    await BlogModel.findByIdAndDelete(req.params.id);
    res.send("Data Deleted");
  } catch (error) {
    console.log(error);
    res.status(500).send("Error deleting data");
  }
});

app.put("/:id", async (req, res) => {
  try {
    await BlogModel.findByIdAndUpdate(req.params.id, req.body);
    res.send("Data updated");
  } catch (error) {
    console.log(error);
    res.status(500).send("Error updating data");
  }
});

app.listen(PORT, () => {
  console.log(`${PORT} is up and running`);
});
