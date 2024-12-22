import express from "express";
import {
  deleteCompany,
  getCompany,
  getCompanyById,
  registerCompany,
  updateCompany,
} from "../controllers/company.controller.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { singleUpload } from "../middlewares/multer.js";

const router = express.Router();

router.post("/register", isAuthenticated, registerCompany);
router.get("/get", isAuthenticated, getCompany);
router.get("/get/:id", isAuthenticated, getCompanyById);
router.post("/update/:id", isAuthenticated, singleUpload, updateCompany);
router.delete("/delete/:id", isAuthenticated, deleteCompany);

export default router;
