const express = require("express");
const Category = require("../models/Category");
const multer = require("multer");
const router = express.Router();
const upload = multer();
// 🟢 **Route: Add Category**
router.post("/add",upload.none(), async (req, res) => {
  try {
    console.log("Received Data:", req.body); // Debugging

    
    const category = new Category({
      name: req.body.name,
      seoTags: req.body.seoTags,
      title: req.body.title,
      metaDescription: req.body.metaDescription,
      metaKeywords: req.body.metaKeywords,
      twitterCard: req.body.twitterCard,
      twitterSite: req.body.twitterSite,
      ogUrl: req.body.ogUrl,
      ogType: req.body.ogType,
      ogTitle: req.body.ogTitle,
      ogDescription: req.body.ogDescription,
      metaChronological: req.body.metaChronological,
    });


    await category.save();
    res.status(201).json({ message: "Category added successfully", category });
  } catch (error) {
    console.error("Error saving category:", error);
    res.status(500).json({ error: "Error adding category" });
  }
});


// 🟢 **Route: Get All Categories**
router.get("/all", async (req, res) => {
  try {
    const categories = await Category.find().select("name seoTags title metaDescription");
    res.status(200).json(categories);
  } catch (error) {
    console.error("Error fetching categories:", error);
    res.status(500).json({ error: "Error fetching categories" });
  }
});

router.get("/:id",upload.none(), async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) return res.status(404).json({ error: "Category not found" });

    res.status(200).json(category);
  } catch (error) {
    console.error("Error fetching category:", error);
    res.status(500).json({ error: "Error fetching category" });
  }
});

// 🟢 **Route: Update Category**
router.put("/update/:id", upload.fields([{ name: "categoryImage" }, { name: "ogImage" }]), async (req, res) => {
  try {
    console.log("Update Request Data:", req.body);
    console.log("Uploaded Files:", req.files);

    const updatedCategory = {
      name: req.body.name,
      seoTags: req.body.seoTags,
      title: req.body.title,
      metaDescription: req.body.metaDescription,
      metaKeywords: req.body.metaKeywords,
      twitterCard: req.body.twitterCard,
      twitterSite: req.body.twitterSite,
      ogUrl: req.body.ogUrl,
      ogType: req.body.ogType,
      ogTitle: req.body.ogTitle,
      ogDescription: req.body.ogDescription,
      metaChronological: req.body.metaChronological,
      
    };

    const category = await Category.findByIdAndUpdate(req.params.id, updatedCategory, { new: true });
    if (!category) return res.status(404).json({ error: "Category not found" });

    res.status(200).json({ message: "Category updated successfully", category });
  } catch (error) {
    console.error("Error updating category:", error);
    res.status(500).json({ error: "Error updating category" });
  }
});

// 🟢 **Route: Delete Category**
router.delete("/delete/:id", async (req, res) => {
  try {
    const category = await Category.findByIdAndDelete(req.params.id);
    if (!category) return res.status(404).json({ error: "Category not found" });

    res.status(200).json({ message: "Category deleted successfully" });
  } catch (error) {
    console.error("Error deleting category:", error);
    res.status(500).json({ error: "Error deleting category" });
  }
});

module.exports = router;

