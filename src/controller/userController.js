const User = require("../../model/userSchema")
const bcrypt = require("bcrypt");
const generateJWT = require("../../utils/jwtgenerate");


const registerUser=async(req,res)=>{
    const { fullName, email, password,dateOfBirth}=req.body
    const userExist=await User.findOne({email});
    if (userExist) {
        res.status(400)
        throw new Error("user already register")
    }
    //bcrypt
    const hashedPassword = await bcrypt.hash(password, 10);
    

    const savedUser = await User.create({ fullName, email, password:hashedPassword, dateOfBirth});
    if (savedUser) {
        res.status(201).json({ _id: savedUser.id, email: savedUser.email ,fullName:savedUser.fullName})
    } else {
        res.status(400);
        throw new Error("user data is not valid")
    }
    
}


const loginUser=async(req,res)=>{
    const {email,password}=req.body
    const saveduser=await User.findOne({email});
    if(!saveduser){
        res.status(400)
        throw new Error("user not found")
    }
    //bcrypt
    const passwordMatch =await bcrypt.compare(password, saveduser.password)
    if (!passwordMatch) {
        res.status(401);
        throw new Error("Invalid email or password");
    }
    //jwt
    const token = generateJWT(saveduser); 

    // Send the token back to the client
    res.status(200).json({ "jwt token":token,"email":saveduser.email ,"userId":saveduser._id})

}

module.exports={loginUser,registerUser}