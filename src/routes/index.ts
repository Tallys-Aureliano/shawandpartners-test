import { Request, Response, Router } from "express";
import { upload } from "./users.routes";
const router = Router();


router.get("/",(req:Request, res:Response) => {
    return res.status(200).send({success:"Server ON and Connect!"});
});

router.use("/api", upload);

export {router};