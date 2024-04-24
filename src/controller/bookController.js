const Book = require("../../model/booksSchema");
const User = require("../../model/userSchema");


// create books entry

const createBook = async (req, res) => {
    const { title, description, userId, ISBN, author, category, rating, publicationYear } = req.body;

    try {
        const savedUser = await User.findById(userId);

        if (!savedUser) {
            return res.status(404).send({
                status: false,
                message: "User is not registered"
            });
        }

        const bookData = await Book.create({ title, description, userId, ISBN, author, category, rating, publicationYear });
        res.status(201).send({
            status: true,
            data: bookData
        });
    } catch (error) {
        if (error.code === 11000 && error.keyPattern && error.keyPattern.ISBN) {
            // Duplicate key error for ISBN field
            const duplicateISBN = error.keyValue.ISBN;
            return res.status(400).send({
                status: false,
                message: `ISBN '${duplicateISBN}' already exists.`
            });
        } else {
            // Other errors
            console.error("Error creating book:", error);
            return res.status(500).send({
                status: false,
                message: "Internal server error"
            });
        }
    }
};

//get books
const getBooks = async (req, res) => {
    try {
        const books = await Book.find();
        res.status(200).json(books);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

//get a single book by ID
const getBookbyId = async (req, res) => {
    try {
        const Id = req.params.id;
        const bookDetail = await Book.findById(Id);
        if (!bookDetail) return res.status(404).send({
            status: false,
            message: "Book not found by the given ID"
        })
        res.status(201).send({
            status: true,
            message: "success",
            data: bookDetail
        })
    }
    catch (err) {
        if (err.name == "CastError") return res.status(400).send({
            status: false,
            message: `Given bookId ${err.value} is not valid, please provide a valid bookId`
        })
        return res.status(500).send({
            status: false,
            message: err.message
        })
    }
}

//update book by id

const updateBook = async (req, res) => {
    try {
        const { title, description, userId, ISBN, author, category, rating, publicationYear } = req.body;

        // Check if user has permission to update the book
        const savedBook = await Book.findById(req.params.id);
        if (!savedBook) {
            return res.status(404).json({ message: 'Book not found' });
        }
        if (savedBook.userId.toString() !== userId) {
            return res.status(403).json({ message: "You don't have permission to update this book" });
        }

        // Update the book
        const updatedBook = await Book.findByIdAndUpdate(req.params.id, { title, description, userId, ISBN, author, category, rating, publicationYear }, { new: true });

        if (!updatedBook) {
            return res.status(404).json({ message: 'Book not found' });
        }

        res.status(200).json(updatedBook);

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

//delete book by id

const deleteBookById = async (req, res) => {
    try {
        const bookId = req.params.id;

        // Check if the book exists
        const book = await Book.findById(bookId);
        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }

        // Delete the book
        await Book.findByIdAndDelete(bookId);

        res.status(200).json({ message: 'Book deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};



module.exports = { createBook, getBooks, getBookbyId, updateBook,deleteBookById }