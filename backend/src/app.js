import express from "express";
import cors from "cors";

const app = express()

app.use(express.json())
app.use(cors({
    origin: 'https://college-discovery-platform-frontend.onrender.com'
}))

import { collegeRouter } from "./routes/college.routes.js";

app.use("/api", collegeRouter)

export default app
