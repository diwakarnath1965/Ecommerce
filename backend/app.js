import express from 'express';
const app = express();
import dotenv from "dotenv"
import { connectDatabase } from './config/db.js';
import errorMiddleware from "./middleware/errors.js"
import cookieParser from "cookie-parser"


//Handle uncaught exceptions
process.on('uncaughtException', (err) => {
    console.log(`Error: ${err}`);
    console.log('Shutting down server due to uncaughtException');
    process.exit(1)
})

dotenv.config({path: "backend/config/.env"})

connectDatabase();

app.use(express.json({limit: "10mb"}))
app.use(cookieParser())



//routes
import productRoutes from "../backend/routes/products.js"
import authRoutes from "../backend/routes/auth.js"
import orderRoutes from "../backend/routes/order.js"

app.use("/api/v1", productRoutes);
app.use("/api/v1", authRoutes);
app.use("/api/v1", orderRoutes);

//error middleware
app.use(errorMiddleware)

const server = app.listen(process.env.PORT,() => {
    console.log(`server started on PORT: ${process.env.PORT} in ${process.env.NODE_ENV} mode`);
})

//Handle unhandled promise rejection
process.on('unhandledRejection',(err) => {
    console.log(`Error: ${err}`);
    console.log("Shutting down the server due to unHandled promise rejection");
    server.close(() => {
        process.exit(1)
    })
})
