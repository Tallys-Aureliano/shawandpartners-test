import { Router } from "express";
import { UploadUserController } from "../app/controllers/uploadUserController";
import multer from "multer";

const uploadUserController = new UploadUserController();
const upload = Router();
const multerConfig = multer();


upload.post("/upload", multerConfig.single('file'),uploadUserController.handle);

export {upload};