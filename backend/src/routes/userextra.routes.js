import {Router} from "express"
import {getAllUsers} from "../controllers/user.controllers.js"

const router = Router()

router.route("/getallusers").get(getAllUsers)



export default router;