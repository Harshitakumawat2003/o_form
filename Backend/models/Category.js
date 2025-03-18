// const mongoose = require("mongoose");

// const categorySchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   seoTags: String,
//   title: String,
//   metaDescription: String,
//   metaKeywords: String,
//   twitterCard: String,
//   twitterSite: String,
//   ogUrl: String,
//   ogType: String,
//   ogTitle: String,
//   ogDescription: String,
//   metaChronological: String,
//   categoryImage: String,
//   ogImage: String,
// });


// const Category= mongoose.model("Category", categorySchema);
// module.exports = Category;

const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  name:String ,
  seoTags: String,
  title: String,
  metaDescription: String,
  metaKeywords: String,
  twitterCard: String,
  twitterSite: String,
  ogUrl: String,
  ogType: String,
  ogTitle: String,
  ogDescription: String,
  metaChronological: String,
});


const Category = mongoose.model("Category", categorySchema);
module.exports = Category;



