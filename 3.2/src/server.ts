import express from "express";
import dotenv from "dotenv";
import path from "path";
import routes from "../routes/routes";
import bodyParser from "body-parser";
import expressLayouts from "express-ejs-layouts";

dotenv.config();

const app = express();
const port = process.env.PORT || "";

app.use(express.json()); // Middleware to parse JSON bodies
app.use(bodyParser.urlencoded({ extended: true })); // Middleware to parse URL-encoded bodies

// Налаштування шаблонів
// app.use(expressLayouts);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "../views"));
// app.set('layout', 'layouts/main');

// Process static files
app.use(express.static(path.join(__dirname, "../public")));
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));
// Process static files for books-page
app.use("/books-page", express.static(path.join(__dirname, "../public/books-page")));
app.use("/books-page_files", express.static(path.join(__dirname, "../public/books-page/books-page_files")));
// Process static files for book-page
app.use("/book/:id", express.static(path.join(__dirname, "../public/book-page")));
app.use("/book-page_files", express.static(path.join(__dirname, "../public/book-page/book-page_files")));
// Process static files for admin-panel
app.use(express.static(path.join(__dirname, "admin-panel")));

app.use(routes);

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});

// const books_local = [
//   { id: 22, title: "СИ++ И КОМПЬЮТЕРНАЯ ГРАФИКА", author: "Андрей Богуславский", image: "22.jpg" },
//   { id: 23, title: "Программирование на языке Go!", author: "Марк Саммерфильд", image: "23.jpg" },
//   { id: 25, title: "Толковый словарь сетевых терминов и аббревиатур", author: "М., Вильямс", image: "25.jpg" },
//   { id: 26, title: "Python for Data Analysis", author: "Уэс Маккинни", image: "26.jpg" },
//   { id: 27, title: "Thinking in Java (4th Edition)", author: "Брюс Эккель", image: "27.jpg" },
//   {
//     id: 29,
//     title: "Introduction to Algorithms",
//     author: "Томас Кормен, Чарльз Лейзерсон, Рональд Ривест, Клиффорд Штайн",
//     image: "29.jpg",
//   },
//   { id: 31, title: "JavaScript Pocket Reference", author: "Дэвид Флэнаган", image: "31.jpg" },
//   {
//     id: 32,
//     title: "Adaptive Code via C#: Class and Interface Design, Design Patterns, and SOLID Principles",
//     author: "Гэри Маклин Холл",
//     image: "32.jpg",
//   },
//   { id: 33, title: "SQL: The Complete Referenc", author: "Джеймс Р. Грофф", image: "33.jpg" },
//   { id: 34, title: "PHP and MySQL Web Development", author: "Люк Веллинг", image: "34.jpg" },
//   {
//     id: 35,
//     title: "Статистический анализ и визуализация данных с помощью R",
//     author: "Сергей Мастицкий",
//     image: "35.jpg",
//   },
//   { id: 36, title: "Computer Coding for Kid", author: "Джон Вудкок", image: "36.jpg" },
//   {
//     id: 37,
//     title: "Exploring Arduino: Tools and Techniques for Engineering Wizardry",
//     author: "Джереми Блум",
//     image: "37.jpg",
//   },
//   {
//     id: 38,
//     title: "Программирование микроконтроллеров для начинающих и не только",
//     author: "А. Белов",
//     image: "38.jpg",
//   },
//   { id: 39, title: "The Internet of Things", author: "Сэмюэл Грингард", image: "39.jpg" },
//   { id: 40, title: "Sketching User Experiences: The Workbook", author: "Сет Гринберг", image: "40.jpg" },
//   { id: 41, title: "InDesign CS6", author: "Александр Сераков", image: "41.jpg" },
//   { id: 42, title: "Адаптивный дизайн. Делаем сайты для любых устройств", author: "Тим Кедлек", image: "42.jpg" },
//   { id: 43, title: "Android для разработчиков", author: "Пол Дейтел, Харви Дейтел", image: "43.jpg" },
//   { id: 44, title: "Clean Code: A Handbook of Agile Software Craftsmanship", author: "Роберт Мартин", image: "44.jpg" },
//   { id: 45, title: "Swift Pocket Reference: Programming for iOS and OS X", author: "Энтони Грей", image: "45.jpg" },
//   {
//     id: 46,
//     title: "NoSQL Distilled: A Brief Guide to the Emerging World of Polyglot Persistence",
//     author: "Мартин Фаулер, Прамодкумар Дж. Садаладж",
//     image: "46.jpg",
//   },
//   { id: 47, title: "Head First Ruby", author: "Джей Макгаврен", image: "47.jpg" },
//   { id: 48, title: "Practical Vim", author: "Дрю Нейл", image: "48.jpg" },
// ];
