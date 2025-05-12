import express from "express";
import cors from 'cors';
import dotenv from 'dotenv';
import { mainRoute } from "./router/index.js";
import connectDb from "./DB/connectiDb.js";
import { ErrorHandlingMiddleware } from "./errorHandling/errorManagementController.js";
dotenv.config();

const app = express();
app.use(cors()); 
app.use(express.json());
const PORT = process.env.PORT;
await connectDb();
app.use(ErrorHandlingMiddleware);
app.use('/api', mainRoute);

// error handling middleware

app.listen(PORT,()=>console.log(`Server started at ${PORT} port`))