import {Router} from "express"
import {protect} from "../middlewares/auth.middlewares.js"
import {createSession} from "../controllers/sessions.controllers.js"

const router = Router()


router.route('/schedule-session').post(protect,createSession)

export default router