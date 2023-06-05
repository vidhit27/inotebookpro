const mongoose=require('mongoose');
const {Schema}=mongoose;
const UserSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    Date:{
        type:Date,
        default:Date.now
    },
})
const user=mongoose.model('user',UserSchema)
user.diffIndexes()
module.exports=user