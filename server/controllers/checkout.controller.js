import Checkout from '../models/checkout.model.js'
import User from '../models/user.model.js'
import extend from 'lodash/extend.js'
import errorHandler from './error.controller.js'


const create = async (req, res) => {
    try {
        let checkout = await Checkout.findOne({ "_id": req.body._id })
        
        if(checkout){
            return res.status(400).json({
                message: "ERROR: This item is already checked out"
            })
        }
        checkout = new Checkout(req.body)
        await checkout.save()
        return res.status(201).json({
            message: "Item successfully checked out."
        })

    }
    catch(err){

        return res.status(400).json({
        error: errorHandler.getErrorMessage(err)
        })
    }
}

const list = async (req, res) => {
    try {
        let checkouts = await Checkout.find().select(' item, outdate, duedate')
        res.json(checkouts)
    } 

    catch (err) {
    return res.status(400).json({
    error: errorHandler.getErrorMessage(err)
    })
    }
}

const getCheckoutByID = async (req, res, next, id) => {
    try {
        let checkout = await Checkout.findById(id)
        if (!checkout)
        return res.status('400').json({
        error: "This item does not exist "
    })
    req.profile = checkout
    next()
    } 

    catch (err) {
        return res.status('400').json({
        error: "Could not retrieve checkouts"
    })
    }
}

const read = (req, res) => {
    
    return res.json(req.profile)
}
const update = async (req, res) => {
try {
    let checkout = req.profile
    checkout = extend(checkout, req.body)
    checkout.outdate = Date.now()
    checkout.duedate = Date.now() + 14
    await checkout.save()
    res.json(checkout)
} 
catch (err) {
    return res.status(400).json({
        error: errorHandler.getErrorMessage(err)
    })
    }
}
const remove = async (req, res) => {
    try {
        let checkout = req.profile
        let deletedCheckout = await checkout.deleteOne()
        res.json(deletedCheckout)
    } 
    catch (err) {
        return res.status(400).json({
        error: errorHandler.getErrorMessage(err)
    })
    }
}
export default { create, getCheckoutByID, read, list, remove, update }