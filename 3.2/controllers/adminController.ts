import { Request, Response, NextFunction } from "express";
import Book from "../models/Book";

const getAdminPage = async (req: Request, res: Response) => {
  res.render("admin/admin", await Book.getBooksWithPagination(req, res));
};

export default {
  getAdminPage,
};
