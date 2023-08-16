const express = require("express");
const bookRoute = express.Router();

const { BookModel } = require("../model/book.model");

bookRoute.post("/add-book", async (req, res) => {
  try {
    const newBook = new BookModel(req.body);
    const savedBook = await newBook.save();
    res.json(savedBook);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

bookRoute.get("/books", async (req, res) => {
  try {
    const books = await BookModel.find();
    res.json(books);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

bookRoute.delete("/delete-book/:id", async (req, res) => {
  try {
    await BookModel.findByIdAndDelete(req.params.id);
    res.json({ message: "Book deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

bookRoute.get("/filter-books/:genre", async (req, res) => {
  try {
    const { genre } = req.params;
    const query = genre === "All" ? {} : { genre };
    const books = await BookModel.find(query);
    res.json(books);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

bookRoute.get("/sort-books/:sort", async (req, res) => {
  try {
    const { sort } = req.params;
    const sortCriteria =
      sort === "asc" ? { price: 1 } : sort === "desc" ? { price: -1 } : {};
    const books = await BookModel.find().sort(sortCriteria);
    res.json(books);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = { bookRoute };
