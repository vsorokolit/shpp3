import { Request, Response } from "express";
import Book from "../models/Book";

const getHomePage = async (req: Request, res: Response) => {
  res.render("books/home", await Book.getBooksWithPagination(req, res));
};

const getBookPage = async (req: Request, res: Response) => {
  try {
    const book = await Book.getBookById(parseInt(req.params.id));

    res.render("books/single", { book });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Database error" });
  }
};

export default {
  getHomePage,
  getBookPage,
};
