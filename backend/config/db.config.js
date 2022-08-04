const mongoose= require('mongoose')
require('dotenv').config()

const connection = mongoose.connect(process.env.DB_URL , {
    useNewUrlParser : true,
    useUnifiedTopology : true
}).then(()=>{
    console.log("Chat DB connected");
}).catch((err)=>{
    console.log(err.message);
})

module.exports = connection