import { Request, Response } from "express";
import Book from "../models/Book";

const getBooksWithPagination = async (req: Request, res: Response) => {
  res.json(await Book.getBooksWithPagination(req, res));
};

const deleteBookById = async (req: Request, res: Response) => {
  try {
    await Book.deleteBookById(parseInt(req.params.id));
    res.render("admin/admin", await Book.getBooksWithPagination(req, res));
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

const createBook = async (req: Request, res: Response) => {
  const title = req.body.title;
  const year = req.body.year;
  const authors = req.body.authors;
  const description = req.body.description;
  const image = req.file?.filename || null;

  try {
    await Book.createBook(title, year, authors, description, image || "");
    res.render("admin/admin", await Book.getBooksWithPagination(req, res));
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

export default { getBooksWithPagination, deleteBookById, createBook };
