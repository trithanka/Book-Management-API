const express=require("express")

const loginValidator = require("../validator/loginValidator")
const { loginUser,registerUser } = require("../controller/userController")
const registerValidator = require("../validator/registerValidator")


const router=express.Router()

router.post("/login",loginValidator,loginUser)
router.post("/register",registerValidator,registerUser)


module.exports=router