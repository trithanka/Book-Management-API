const express=require("express")
const dotenv=require("dotenv");
dotenv.config()
const connect = require("./database");
const router = require("./src/Routes/userRoute");


const PORT=3000
const app=express()

app.use(express.json())

app.use(router)
app.use("/books",require("./src/routes/bookRoute"))

connect()
app.listen(PORT,()=>{
    console.log(`app running  on port ${PORT}`);
})

