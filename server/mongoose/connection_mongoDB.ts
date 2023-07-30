const mongoose = require('mongoose');
require('dotenv').config()

export default async function connectDB(){
    mongoose.connect(process.env.MONGO_URI).then(()=>{
    console.log('Connected to mongoDB')
    }).catch((err:any)=>{
        console.log(err)
    })
}
