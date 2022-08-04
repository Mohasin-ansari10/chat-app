const express = require('express')
const cors = require('cors')
require('dotenv').config()
const app = express()
const connection = require('./config/db.config')

const userRoutes = require('./routes/userRoute')

app.use(cors())
app.use(express.json())


app.use("/v1/user" , userRoutes )



const  server = app.listen(process.env.PORT , ()=>{
    console.log(`server is up and running on PORT ${process.env.PORT}`);
})