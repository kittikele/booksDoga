import express from "express"
import * as db from "./database/db.js"

const PORT = 3000;
const app = express()

app.use(express.json())

app.get("/api/books/author/:author", (req, res) => {
    const books = db.getBooksByAuthor(req.params.author)
    if(books.length == 0){
        return res.status(404).json({"message": "No books found for this author"})
    }
    res.status(200).json(books)
})

app.get("/api/books/year/:year", (req, res) => {
    const books = db.getBooksByYear(req.params.year)
    if(books.length == 0){
        return res.status(404).json({"message": "No books found for this year"})
    }
    res.status(200).json(books)
})

app.post("/api/books", (req, res) => {
    const {author, title, publishYear, copies} = req.body
    if(!author || !title || !publishYear || !copies){
        return res.status(400).json({"message": "Author, title, publishYear and copies are required"})
    }
    const saved = db.createBook(author, title, publishYear, copies)
    res.status(201).json({"message": "Book created successfully", "id": saved.lastInsertRowid})
})

app.put("/api/books/:id", (req, res) => {
    const book = db.getBookById(+req.params.id)
    if(!book){
        return res.status(404).json({"message": "Book not found"})
    }
    const {author, title, publishYear, copies} = req.body
    if(!author || !title || !publishYear || !copies){
        return res.status(400).json({"message": "Author, title, publishYear and copies are required"})
    }
    db.updateBook(author, title, publishYear, copies, +req.params.id)
    res.status(200).json({"message": "Book updated successfully"})
})

app.delete("/api/books/:id", (req,res) => {
    const book = db.getBookById(+req.params.id)
    if(!book){
        return res.status(404).json({"message": "Book not found"})
    }
    db.deleteBook(+req.params.id)
    res.status(200).json({"message": "Book deleted successfully"})
})

app.listen(PORT, () => {
    console.log(`Server runs on port:${PORT}`)
})