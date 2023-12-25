require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const fileUpload = require('express-fileupload')
const morgan = require('morgan')


const app = express()


app.use(express.json({ limit:'2250mb'})) 
app.use(express.urlencoded({limit: '2250mb', extended: 'true'}))


app.use(cors())

app.use(cookieParser())

app.use(fileUpload({
    useTempFiles: true 
}))

app.use(morgan('dev'))

//routes
app.use('/admin', require('./routes/adminRouter'));


//connect to mongodb
const URI = process.env.MONGODB_URL
mongoose.connect(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, err => {
    if(err) throw err;
    console.log("Connected to mongodb");
})


const PORT = process.env.PORT || 5000
app.listen(PORT, ()=> {
    console.log('Sever running on port', PORT)
})