import express from 'express'
import authCtrl from '../controllers/auth.controller.js'
import userCtrl from '../controllers/user.controller.js'

const router = express.Router()

router.param('userId', userCtrl.userByID)

router.route('/api/users').post(userCtrl.create)
router.route('/api/users').get(userCtrl.list)
router.route('/api/users/:userId').get(authCtrl.requireSignin, userCtrl.read)
router.route('/api/users/:userId').put(authCtrl.requireSignin, authCtrl.hasAuthorization, userCtrl.update)
router.route('/api/users/:userId').delete(authCtrl.requireSignin, authCtrl.hasAuthorization, userCtrl.remove)
router.route('/api/users/:userId/holds').put(authCtrl.requireSignin, authCtrl.hasAuthorization, userCtrl.updateHolds)

export default router