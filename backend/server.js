import dotenv from "dotenv";
dotenv.config({
    path: ".env"
})


import app from "./src/app.js";
import { testDB } from "./src/config/database.js";
testDB()


const port = process.env.PORT || 3000

app.listen(port, () => {
    console.log("Server is running on port 3000")
})