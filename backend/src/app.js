import express from "express";
import cors from "cors";

const app = express()

const allowedOrigins = [
    process.env.CLIENT_URL,
    process.env.PROD_CLIENT_URL
];

app.use(express.json())
app.use(cors({
    origin: function (origin, callback) {
        if (!origin) return callback(null, true);

        if (allowedOrigins.includes(origin)) {
            return callback(null, true);
        } else {
            return callback(new Error("Not allowed by CORS"));
        }
    }
}))

import { collegeRouter } from "./routes/college.routes.js";

app.use("/api", collegeRouter)

export default app
