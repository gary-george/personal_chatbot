import express, { Application } from "express";
import { errorHandler } from "./middlewares/errors";
import userRouter from "./routes";
import { json } from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

const app: Application = express();
const port = process.env.PORT || 8000;

app.use(json());
app.use(cors());

app.use(userRouter);

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Listening on port: ${port}`);
});
