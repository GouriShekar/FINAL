const mongoose = require('mongoose');
const BlogSchema = new mongoose.Schema({
  title: String,
  content: String,
  img_url: String,
});
const BlogModel = mongoose.model("Blog", BlogSchema);
module.exports = BlogModel;
