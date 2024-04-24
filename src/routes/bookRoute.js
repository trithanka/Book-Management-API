const express=require("express");
const { createBook, getBooks, getBookbyId, updateBook, deleteBookById } = require("../controller/bookController");
const bookValidator = require("../validator/bookValidator");
const bookUpdateValidator = require("../controller/bookUpdateController");
const validateToken = require("../../middleware/validatetokenHandler");
const router=express.Router();

//middleware /private
router.use(validateToken)

//retrive all the books
router.get("/",getBooks)

//fetch the book by id
router.get("/:id",getBookbyId)

//create a new book collection
router.post("/",bookValidator,createBook)

//update based on id
router.put("/:id",bookUpdateValidator,updateBook)

//delete 
router.delete("/:id",deleteBookById)


module.exports=router