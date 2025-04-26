import { Request, Response } from "express";
import pool from "../config/db";

const getBooks = async (offset: number, limit: number) => {
  const sql = "SELECT * FROM books LIMIT ?, ?";
  const [books] = await pool.query(sql, [offset, limit]);
  return books;
};

const getBooksWithPagination = async (req: Request, res: Response) => {
  const page = Math.max(1, parseInt(req.query.page as string) || 1);
  const limit = Math.min(50, parseInt(req.query.limit as string) || 12);
  const offset = (page - 1) * limit;
  const books = await getBooks(offset, limit);
  const total = await getTotalBooksCount();

  return {
    books,
    currentPage: page,
    totalPages: Math.ceil(total / limit),
    totalBooks: total,
  };
};

const getBookById = async (id: number) => {
  const sql = "SELECT * FROM books WHERE id = ?";
  const [books] = await pool.query<any[]>(sql, [id]);

  if (books.length === 0) {
    return null;
  }

  return books[0];
};

const getTotalBooksCount = async () => {
  const sql = "SELECT COUNT(*) as count FROM books";
  const [result] = await pool.query(sql);
  const count: number = (result as any)[0].count;

  return count;
};

const deleteBookById = async (id: number) => {
  try {
    await pool.query("DELETE FROM books WHERE id = ?", [id]);
    return { success: true };
  } catch (error) {
    return { success: false, error: "Server error" };
  }
};

const createBook = async (title: string, year: number, authors: string, description: string, image: string) => {
  if (!Array.isArray(authors) || authors.length < 1 || authors.length > 3) {
    return { success: false, error: "Authors must be an array with 1 to 3 authors." };
  }

  try {
    const sql =
      "INSERT INTO books (title, year, author1, author2, author3, description, image) VALUES (?, ?, ?, ?, ?, ?, ?)";
    const [author1, author2 = null, author3 = null] = authors;
    await pool.query(sql, [title, year, author1, author2, author3, description, image]);
    return { success: true };
  } catch (error) {
    console.error("Error creating book:", error);
    return { success: false, error: "Server error" };
  }
};

export default {
  getBooksWithPagination,
  getBookById,
  getTotalBooksCount,
  deleteBookById,
  createBook,
};
