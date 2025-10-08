import {Router} from "express"
import {completeProfile, getAllUsers, getProfile} from "../controllers/user.controllers.js"
import {protect} from "../middlewares/auth.middlewares.js"

const router = Router()

router.route("/getallusers").get(getAllUsers)
router.route("/me").get(protect,getProfile)
router.route("/complete-profile").post(protect,completeProfile)



export default router;