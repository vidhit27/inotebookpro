const express=require('express')
const User=require('../models/User')
const {body,validationResult}=require('express-validator')
const router=express.Router();
const bcrypt=require('bcryptjs')
var jwt=require('jsonwebtoken');
const user = require('../models/User');
const JWT_SECRET='Harryisagoodboy$'
const fetchuser=require('../middleware/fetchuser')

//Route-1 Creating a account
let success=false;
router.post('/createUser',[
body('name','Enter Valid Name').isLength({min:3}),
body('email','Enter Valid Email').isEmail(),
body('password','Password must be atleast of 5 characters').isLength({ min: 5 })],async (req,res)=>{
    let success=false;
  //errors
  const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }    
  try{
  //check whether the user with this email exist or not
  let user=await User.findOne({email:req.body.email});
  if(user){
    return res.status(400).json({success,error:"Sorry user with this email already exist"})
  }  
    
  const salt=await bcrypt.genSalt(10);
  const secPass=await bcrypt.hash(req.body.password,salt);

    //create new user
    user= await User.create({
        name: req.body.name,
        email: req.body.email,
        password:secPass
      })
      const data={
       user: {
           id:user.id
        }
      }
      const authToken=jwt.sign(data,JWT_SECRET);
      // console.log(authToken)
      success=true;
      res.json({success,authToken});
    }
    catch(error){
      console.log(error.message)
      res.status(500).send("Some Error Occured")
    }
})

//Route-2 Login
router.post('/login',[
  body('email','Enter Valid Email').isEmail(),
  body('password','Password cannot be blank').exists(),],async (req,res)=>{
      
    //errors
    const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }    

    const {email,password}=req.body;  
    try{
    //checking email exists or not
    let user=await User.findOne({email});
    if(!user){
      success=false
      return res.status(400).json({success,error:"Please try with correct login credentials"})
    }  
    //comparing password
    const passwordCompare=await bcrypt.compare(password,user.password);
    if(!passwordCompare){
      success=false
      return res.status(400).json({success,error:"Please try with correct login credentials"}) 
    }

        const data={
         user: {
             id:user.id
          }
        }
        const authToken=jwt.sign(data,JWT_SECRET);
        // console.log(authToken)
        success=true;
        res.json({success,authToken});
      }
      catch(error){
        console.log(error.message)
        res.status(500).send("Some Error Occured")
      }
  })
  
//Route-3 Get the logged-in user details
router.post('/getUser',fetchuser,async(req,res)=>{
  try{
    userId=req.user.id;
    const user=await User.findById(userId).select("-password")
    res.send(user)
  }
  catch(error){
    console.error(error.message)
    res.status(500).send("Internal server error")
  }
})


module.exports=router