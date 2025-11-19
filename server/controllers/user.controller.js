import User from '../models/user.model.js'
import extend from 'lodash/extend.js'
import errorHandler from './error.controller.js'


const create = async (req, res) => {
    try {
        let user = await User.findOne({ "email": req.body.email })
        
        if(user){
            return res.status(400).json({
                message: "Account with this email address already exists"
            })
        }
        user = new User(req.body)
        await user.save()
        return res.status(201).json({
            message: "Successfully created a new account."
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
        let users = await User.find().select('name email cardnumber checkouts holds fines created updated')
        res.json(users)
    } 

    catch (err) {
    return res.status(400).json({
    error: errorHandler.getErrorMessage(err)
    })
    }
}

const getCheckouts = async (req, res) => {
    try{
        let user = req.profile
        if(!user){
            return res.status(404).json({message: "User not found"})
        }
        res.json(user.checkouts)
        
    }

    catch(err) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err)
        })
    }
}

const userByID = async (req, res, next, id) => {
    try {
        let user = await User.findById(id)
        if (!user)
        return res.status('400').json({
        error: "User not found"
    })
    req.profile = user
    next()
    } 

    catch (err) {
        return res.status('400').json({
        error: "Could not retrieve user"
    })
    }
}
const read = (req, res) => {
    req.profile.hashed_password = undefined
    req.profile.salt = undefined
    return res.json(req.profile)
    }
    const update = async (req, res) => {
    try {
        let user = req.profile
        user = extend(user, req.body)
        user.updated = Date.now()
        await user.save()
        user.hashed_password = undefined
        user.salt = undefined
        res.json(user)
    } 
    catch (err) {
        return res.status(400).json({
        error: errorHandler.getErrorMessage(err)
    })
    }
}
const remove = async (req, res) => {
    try {
        let user = req.profile
        let deletedUser = await user.deleteOne()
        deletedUser.hashed_password = undefined
        deletedUser.salt = undefined
        res.json(deletedUser)
    } 
    catch (err) {
        return res.status(400).json({
        error: errorHandler.getErrorMessage(err)
    })
    }
}
export default { create, userByID, read, list, remove, update }