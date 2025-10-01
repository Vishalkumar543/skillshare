import {Router} from "express"
import {upload} from "../middlewares/multer.middlewares.js"
import {login, register, verifyUser} from "../controllers/auth.controllers.js"
import {protect} from "../middlewares/auth.middlewares.js"


const router = Router()


router.route("/register").post(upload.single("avatar"),register)
router.route("/login").post(login)
router.route("/verify-user").post(protect,verifyUser)


export default router