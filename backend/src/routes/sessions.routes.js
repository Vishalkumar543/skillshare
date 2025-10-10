import {Router} from "express"
import {protect} from "../middlewares/auth.middlewares.js"
import {createSession, getAllSessions, updateSession} from "../controllers/sessions.controllers.js"

const router = Router()


router.route('/schedule-session').post(protect,createSession)
router.route('/get-sessions').get(protect,getAllSessions)
router.route('/update/:sessionId').put(protect,updateSession)

export default router