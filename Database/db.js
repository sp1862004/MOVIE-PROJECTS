const { default: mongoose } = require("mongoose");

const db = mongoose.connect('mongodb://localhost:27017/AdminNode').then(() => {
    console.log("database connected😂😂");

}).catch((err) => {
    console.log("database error😢😢😢");

})
module.exports = db;