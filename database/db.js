import Database from "better-sqlite3";

const db = new Database("./database/konyvek.sqlite")

db.prepare(`CREATE TABLE IF NOT EXISTS konyvek(id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, author TEXT, title TEXT, publishYear INTEGER, copies INTEGER)`).run()

export const getBookById = (id) => db.prepare(`SELECT * FROM konyvek WHERE id = ?`).get(id)

export const getBooksByAuthor = (author) => db.prepare(`SELECT * FROM konyvek WHERE author = ?`).all(author)

export const getBooksByYear = (publishYear) => db.prepare(`SELECT * FROM konyvek WHERE publishYear = ?`).all(publishYear)

export const createBook = (author, title, publishYear, copies) => db.prepare(`INSERT INTO konyvek (author, title, publishYear, copies) VALUES (?,?,?,?)`).run(author, title, publishYear, copies)

export const updateBook = (author, title, publishYear, copies, id) => db.prepare(`UPDATE konyvek SET author = ?, title = ?, publishYear = ?, copies = ? WHERE id = ?`).run(author, title, publishYear, copies, id)

export const deleteBook = (id) => db.prepare(`DELETE FROM konyvek WHERE id = ?`).run(id)