import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import pdfRouter from "./router/pdf-router";
import chatRouter from "./router/chat-router";
import collectionRouter from "./router/collections"

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/pdf", pdfRouter);
app.use("/api/pdf", chatRouter);
app.use("/api/pdf", collectionRouter);


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  console.log(`http://localhost:${port}`);
});
