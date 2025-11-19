import express from 'express'
import checkoutCtrl from '../controllers/checkout.controller.js'

const router = express.Router()
router.route('/api/checkouts').post(checkoutCtrl.create)
router.route('/api/checkouts').get(checkoutCtrl.list)
router.param('checkoutId', checkoutCtrl.getCheckoutById)
router.route('/api/checkouts/:checkoutId').get(checkoutCtrl.read)
router.route('/api/checkouts/:checkoutId').put(checkoutCtrl.update)
router.route('/api/checkouts/:checkoutId').delete(bookCtrl.remove)
export default router