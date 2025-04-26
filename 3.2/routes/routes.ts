import express from "express";
import navigationController from "../controllers/navigationController";
import bookController from "../controllers/bookController";
import adminController from "../controllers/adminController";
import auth from "../middlewares/auth";
import upload from "../middlewares/multer";

const router = express.Router();

router.get("/", navigationController.getHomePage);
router.get("/book/:id", navigationController.getBookPage);

router.get("/api/books", bookController.getBooksWithPagination);
router.post("/api/delete-book/:id", auth.adminAuthMiddleware, bookController.deleteBookById);
router.post("/api/create-book", auth.adminAuthMiddleware, upload.single("image"), bookController.createBook);

router.get("/admin", auth.adminAuthMiddleware, adminController.getAdminPage);

export default router;
