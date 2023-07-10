import { Request, Response, Router} from "express";
import multer from "multer";

const multerConfig = multer();
const router = Router();

router.post("/users", 
                multerConfig.single("file"), 
                    (request: Request, response: Response) => {
                        console.log(request.file); 
                            return response.send();
            });

export {router};