// import react from "react"
import NoteContext from "./noteContext"
import { useState } from "react"

const NoteState=(props)=>{
    // const s1={
    //     "name":"Harry",
    //     "class":"5b"
    // }
    // const [state,setstate]=useState(s1)
    // const update=()=>{
    //     setTimeout(()=>{
    //         setstate({
    //         "name":"Alex",
    //         "class":"10b"})
    // },1000);
    const notesInitial=[]
    const [notes,setNotes]=useState(notesInitial)
    const host='http://localhost:5000'
    
    //Get all notes 
    const getallnotes=async ()=>{
      const response=await fetch(`${host}/api/notes/fetchallnotes`,{
      method:'GET',
      headers:{
        'Content-Type':'application/json',
        'auth-token': localStorage.getItem('token')
        // 'auth-token':'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjM1YWU4YWQyNjg1ZGRhOGE0YjQzZDRiIn0sImlhdCI6MTY2NjkwMjE4OX0.vl-xd1-eBORNTuQoImGCsAoitkb7Web3RmTtD7ocwlQ'
      }
    });
    const json=await response.json()
    console.log(json)
    setNotes(json)
    }

    //Add Note
    const addNote=async (title,description,tag)=>{
      const response=await fetch(`${host}/api/notes/addnote`,{
        method:'POST',
        headers:{
          'Content-Type':'application/json',
          'auth-token': localStorage.getItem('token')
          // 'auth-token':'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjM1YWU4YWQyNjg1ZGRhOGE0YjQzZDRiIn0sImlhdCI6MTY2NjkwMjE4OX0.vl-xd1-eBORNTuQoImGCsAoitkb7Web3RmTtD7ocwlQ'
        },
        body:JSON.stringify({title,description,tag})
      });
      const note=await response.json()
      // console.log(json)
      //client side
        // const note=json
        setNotes(notes.concat(note))

    }


    //Delete Note
    const deleteNote=async(id)=>{
      const response=await fetch(`${host}/api/notes/deleteNote/${id}`,{
        method:'DELETE',
        headers:{
          'Content-Type':'application/json',
          'auth-token':localStorage.getItem('token')
          // 'auth-token':'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjM1YWU4YWQyNjg1ZGRhOGE0YjQzZDRiIn0sImlhdCI6MTY2NjkwMjE4OX0.vl-xd1-eBORNTuQoImGCsAoitkb7Web3RmTtD7ocwlQ'

        }
      });
      const json=await response.json()
    console.log(json)
     //client side
      const newNotes=notes.filter((note)=>{
        return note._id!==id
      })   
      setNotes(newNotes)
    }


    //Edit Note
    const editNote=async (id,title,description,tag)=>{
      const response=await fetch(`${host}/api/notes/updateNote/${id}`,{
        method:'PUT',
        headers:{
          'Content-Type':'application/json',
          'auth-token':localStorage.getItem('token')
          // 'auth-token':'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjM1YWU4YWQyNjg1ZGRhOGE0YjQzZDRiIn0sImlhdCI6MTY2NjkwMjE4OX0.vl-xd1-eBORNTuQoImGCsAoitkb7Web3RmTtD7ocwlQ'

        },
        body:JSON.stringify({title,description,tag})
      });
      const json=response.json()
      console.log(json)
      
      //client side
      const newNotes=JSON.parse(JSON.stringify(notes))
      for(let index=0;index<newNotes.length;index++){
           const element=newNotes[index];
           if(element._id===id){
            newNotes[index].title=title
            newNotes[index].description=description
            newNotes[index].tag=tag
            break;
           }
          //  setNotes(notes)
      }    
    }

    
    return (
        <NoteContext.Provider value={{notes,addNote,deleteNote,editNote,getallnotes}}>
            {props.children}
        </NoteContext.Provider>
    )

    }
export default NoteState;