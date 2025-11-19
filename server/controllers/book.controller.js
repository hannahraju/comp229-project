import Book from '../models/book.model.js'
import extend from 'lodash/extend.js'
import errorHandler from './error.controller.js'

const create = async (req, res) => {

    try {
        let book = await Book.findOne({"isbn": req.body.isbn})

        if(book){
            return res.status(400).json({
                message: "Item with this ISBN already already exists. "
            })
        }
        book = new Book(req.body)
        await book.save()
        return res.status(200).json({
        message: "Successfully added new book."
    })
} 

catch (err) {
    return res.status(400).json({
    error: errorHandler.getErrorMessage(err)
})
}
}

const list = async (req, res) => {
    try {
        let books = await Book.find().select('title author year genre format isbn totalcopies available created updated')
        res.json(books)
    } 

    catch (err) {
    return res.status(400).json({
    error: errorHandler.getErrorMessage(err)
    })
    }
}

const bookByID = async (req, res, next, id) => {
    try {
        let book = await Book.findById(id)
        if (!book)
        return res.status(400).json({
        error: "Book not found"
    })
    req.profile = book
    next()
    } 

    catch (err) {
        return res.status(400).json({
        error: "Could not retrieve book"
    })
    }
}
const read = (req, res) => {
    
    return res.json(req.profile)
}
const update = async (req, res) => {
    try {
        let book = req.profile
        book = extend(book, req.body)
        book.updated = Date.now()
        await book.save()
        res.json(book)
    } 
    catch (err) {
        return res.status(400).json({
        error: errorHandler.getErrorMessage(err)
    })
    }
}
const remove = async (req, res) => {
    try {
        let book = req.profile
        let deletedBook = await book.deleteOne()
        res.json(deletedBook)
    } 
    catch (err) {
        return res.status(400).json({
        error: errorHandler.getErrorMessage(err)
    })
    }
}
export default { create, bookByID, read, list, remove, update }