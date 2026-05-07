import { Router } from "express";
import { getColleges, getCollegeByID, compareColleges } from "../controller/college.controller.js";

const collegeRouter = Router()

// search + filter colleges
collegeRouter.get("/colleges", getColleges)

// get individual college details
collegeRouter.get("/colleges/:id", getCollegeByID)

// compare colleges
collegeRouter.post("/compare", compareColleges)


export { collegeRouter }