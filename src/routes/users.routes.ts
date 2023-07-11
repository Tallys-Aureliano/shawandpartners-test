import { Router } from "express";
import { UploadUserController } from "../app/controllers/uploadUserController";
import multer from "multer";
import { SearchController } from "../app/controllers/searchController";

const uploadUserController = new UploadUserController();
const searchController = new SearchController();
const upload = Router();
const multerConfig = multer();

upload.get("/users:value?", searchController.handle);
upload.post("/file", multerConfig.single('file'),uploadUserController.handle);

export {upload};