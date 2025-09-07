import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import cors from "cors";

import router from "./routes/product.route.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/products", router);

app.listen(process.env.PORT, () => {
  connectDB();
  console.log(`Server running... http://localhost:${process.env.PORT}`);
});
