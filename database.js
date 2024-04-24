const mongoose = require("mongoose");
const connect = async() => {
    await mongoose.connect(process.env.MONGO_URL,).then(() => {
        console.log("connected to MongoDB")
    }).catch((err) => {
        console.log(err)
    })
}

module.exports = connect;