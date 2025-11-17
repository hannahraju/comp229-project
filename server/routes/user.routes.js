import express from 'express'
import userCtrl from '../controllers/user.controller.js'
import authCtrl from '../controllers/auth.controller.js'

const router = express.Router()
router.route('/api/users').post(userCtrl.create)
router.route('/api/users').get(userCtrl.list)
router.route('/api/users/:userId').get(authCtrl.requireSignin, userCtrl.read)
router.route('/api/users/:userId').put(authCtrl.requireSignin, authCtrl.hasAuthorization, userCtrl.update)
router.route('/api/users/:userId').delete(authCtrl.requireSignin, authCtrl.hasAuthorization, userCtrl.remove)
router.param('userId', userCtrl.userByID)
export default router