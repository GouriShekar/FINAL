var mongoose = require("mongoose");
mongoose
  .connect("mongodb+srv://gouritshekar:Gouri@cluster0.kiwsyfm.mongodb.net/openICT?retryWrites=true&w=majority&appName=Cluster0")
  .then(() => {
    console.log("Connected to DB");
  })
  .catch((error) => {
    console.log(error);
  });
