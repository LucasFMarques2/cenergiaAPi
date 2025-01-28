require('express-async-errors')
require('dotenv/config')

const express = require('express')
const  cors = require('cors')
const AppError = require("./utils/AppError")
const app = express()
const router = require('./routes')

app.use(cors())
app.use(express.json())
app.use(router)

app.use((error,req,res,next) =>{
    if(error instanceof AppError){
        return res.status(error.statusCode).json({
            status: "Error",
            message: error.message
        })
    }

    console.error(error);

    return res.status(500).json({
        status: "error",
        message: "Internal server error"
    })
})

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Serviço rondando na porta ${PORT}`)
})