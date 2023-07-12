import Category from "../models/category.js";
import Product from "../models/product.js";
import slugify from "slugify";

export const create = async (req, res) => {
    try {
        // destructure
        const { name } = req.body;

        // Check if name is given
        if (!name.trim()) {
            return res.json({ error: "Name is required" });
        }

        // find if the category name already exists
        const existingCategory = await Category.findOne({ name });
        if (existingCategory) {
            return res.json({ error: "Already exists" });
        }

        // make a new category with a given name and slugified name
        const category = await new Category({ name, slug: slugify(name) });

        // save the new category to DB
        category.save();

        // respond with the category
        res.json(category);
    } catch (err) {
        console.log(err);
        return res.status(400).json(err);
    }
};

export const update = async (req, res) => {
    try {
        const { name } = req.body;
        const { categoryId } = req.params;
        const category = await Category.findByIdAndUpdate(
            categoryId,
            { name, slug: slugify(name) },
            { new: true }
        );
        res.json(category);
    } catch (err) {
        console.log(err);
        return res.status(400).json(err.message);
    }
};

export const remove = async (req, res) => {
    try {
        const removed = await Category.findByIdAndDelete(req.params.categoryId);
        res.json(removed);
    } catch (err) {
        console.log(err);
        return res.status(400).json(err.message);
    }
};

export const list = async (req, res) => {
    try {
        const all = await Category.find({});
        res.json(all);
    } catch (err) {
        console.log(err);
        return res.status(400).json(err.message);
    }
};

export const read = async (req, res) => {
    try {
        const category = await Category.findOne({ slug: req.params.slug });
        res.json(category);
    } catch (err) {
        console.log(err);
        return res.status(400).json(err.message);
    }
};

export const productsByCategory = async (req, res) => {
    try {
        const category = await Category.findOne({ slug: req.params.slug });
        const products = await Product.find({ category }).populate("category");
        res.json({ category, products });
    } catch (err) {
        console.log(err);
        return res.status(400).json(err.message);
    }
};
