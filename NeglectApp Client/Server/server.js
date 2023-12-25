require('dotenv').config({path:`./config.env`});
const mongoose=require('mongoose');
const app=require('./app')
//const data="pass123<pass>";
//const newdata=data.replace("<pass>", "fail");
//console.log(newdata )
//Connection with Mongodb
const DB= process.env.DATABASE;
//const newDB=process.env.DATABASE.replace('<password>','admins');

mongoose.connect(
    DB,{
        useNewUrlParser:true,
    }
).then(console.log('DB connected'))
.catch(err=>console.log(err))


const PORT=process.env.PORT ||5000;
app.listen(PORT,()=>{
    console.log(`Listening on PORT ${PORT}`)
})