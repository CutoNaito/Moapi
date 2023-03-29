import { Router } from "express";
import { sendVerificationCode } from "../../controllers/SMTP/SMTPController";

const router = Router();

router.route("/").post(sendVerificationCode);

export default router;