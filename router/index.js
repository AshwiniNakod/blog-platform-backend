import express from "express";
import blogRouter from "./blogRoutes.js";
import userRouter from "./userRoutes.js";

export const mainRoute = express.Router();
// setup the all routes
mainRoute.use('/blog', blogRouter);
mainRoute.use('/user', userRouter);