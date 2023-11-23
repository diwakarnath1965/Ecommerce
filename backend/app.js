import express from 'express';
const app = express();
import dotenv from "dotenv"
import { connectDatabase } from './config/db.js';

dotenv.config({path: "backend/config/.env"})

connectDatabase();

app.use(express.json())

import productRoutes from "../backend/routes/products.js"

app.use("/api/v1", productRoutes);

app.listen(process.env.PORT,() => {
    console.log(`server started on PORT: ${process.env.PORT} in ${process.env.NODE_ENV} mode`);
})

