import { Request, Response } from "express";
import path from "path";
import fs from "fs";
import Book from "../models/Book";

const getBooksWithPagination = async (req: Request, res: Response) => {
  res.json(await Book.getBooksWithPagination(req, res));
};

const deleteBookById = async (req: Request, res: Response) => {
  try {
    const bookId = parseInt(req.params.id);
    const book = await Book.getBookById(bookId);

    if (book.image) {
      const imagePath = path.join(__dirname, "../uploads", book.image);
      try {
        await fs.promises.unlink(imagePath);
      } catch (err) {
        console.error("Помилка при видаленні файлу:", err);
      }
    }

    await Book.deleteBookById(bookId);

    res.status(200).json({ ok: true });
  } catch (error) {
    res.status(500).json({ error: "Помилка сервера" });
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
    res.status(200).json({ ok: true });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

export default { getBooksWithPagination, deleteBookById, createBook };
