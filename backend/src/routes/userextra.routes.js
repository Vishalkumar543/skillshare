import {Router} from "express"
import {getAllUsers, getProfile} from "../controllers/user.controllers.js"
import {protect} from "../middlewares/auth.middlewares.js"

const router = Router()

router.route("/getallusers").get(getAllUsers)
router.route("/me").get(protect,getProfile)



export default router;