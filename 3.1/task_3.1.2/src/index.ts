import express, { Express } from "express";
import dotenv from "dotenv";
import path from "path";
import router from "../routes/index";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || "";

app.use(express.json());

app.use(express.static(path.join(__dirname, "../public")));

app.use("/", router);

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
