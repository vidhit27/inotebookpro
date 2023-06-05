const express=require('express')
const router=express.Router();
const fetchuser=require("../middleware/fetchuser")
const Notes=require('../models/Notes')
const {body,validationResult}=require('express-validator')


//Route-1 fetch all notes
router.get('/fetchallnotes',fetchuser,async (req,res)=>{
 try{const notes= await Notes.find({user:req.user.id})
 res.json(notes)
}
catch(error){
    res.status(500).send("Internal server error")
 }
})

//Route-2 add notes
router.post('/addnote',fetchuser,[
    body('title','Enter Valid title').isLength({min:3}),
body('description','Description must be atleast of 5 characters').isLength({ min: 5 })
],async(req,res)=>{
try {
    const {title,description,tag}=req.body;
    const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }    
      const notes=new Notes({
        title,description,tag,user:req.user.id
      })
      const saveddata=await notes.save()
      res.json(notes)

} catch (error) {
    res.status(500).send("Internal server error")
    
}
})

//Route-3 Update the Notes
router.put('/updateNote/:id',fetchuser,async(req,res)=>{
  const {title,description,tag}=req.body;
try{
  //Create a newnote
  const newNote={};
  if(title){
    newNote.title=title;
  }
  if(description){
    newNote.description=description;
  }
  if(tag){
    newNote.tag=tag;
  }

  //find note to be updated
  let note=await Notes.findById(req.params.id)
  if(!note){
    return res.status(404).send("Not Found")
  }
  if(note.user.toString()!==req.user.id){
    return res.status(401).send("Not Allowed")
  }
  note=await Notes.findByIdAndUpdate(req.params.id,{$set:newNote},{new:true})
  res.json({note})
}
catch(error){
  res.status(500).send("Internal server error")
}
})

//Route-4 delete the Notes
router.delete('/deleteNote/:id',fetchuser,async(req,res)=>{
  // const {title,description,tag}=req.body;
try{

  //find note to be updated
  let note=await Notes.findById(req.params.id)
  if(!note){
    return res.status(404).send("Not Found")
  }
  if(note.user.toString()!==req.user.id){
    return res.status(401).send("Not Allowed")
  }
  note=await Notes.findByIdAndDelete(req.params.id)
  res.json({"success":"Note Deleted",note:note})
}
catch(error){
  res.status(500).send("Internal server error")
}
})

module.exports=router