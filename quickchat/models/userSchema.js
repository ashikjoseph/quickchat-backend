const mongoose=require('mongoose')

const userSchema=new mongoose.Schema({
    fullname:{
        type:String,
        require:true
    },
    username:{
        type:String,
        require:true,
        unique:true
    },
    password:{
        type:String,
        require:true,
        minilength:8
    },
    gender:{
        type:String,
        require:true,
        enum:["male","female"]
    },
    profilePicture:{
        type:String,
        default:""
    },
},{timestamps:true})

const User=mongoose.model("User",userSchema)
module.exports=User;