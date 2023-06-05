import {React,useContext,useState} from 'react'
import NoteContext from '../Context/notes/noteContext'


const Addnote = (props) => {
    const Context=useContext(NoteContext)
    const {addNote}=Context;
    const [note,setNotes]=useState({title:"",description:"",tag:""})
    const handleClick=(e)=>{
        e.preventDefault()
        addNote(note.title,note.description,note.tag)
        setNotes({title:"",description:"",tag:""})
        props.showalert("Added Successfully","success")
    }
    const onChange=(e)=>{
        setNotes({...note,[e.target.name]:e.target.value})
    }


  return (
   <div>
    <div className='container my-3'>
      <h2>Add Note</h2>
      <form>
<div className="mb-3">
  <label htmlFor="title" className="form-label">Title</label>
  <input type="text" className="form-control" id="title" name="title" aria-describedby="emailHelp" value={note.title} onChange={onChange}/>
</div>
<div className="mb-3">
  <label htmlFor="description" className="form-label">Description</label>
  <input type="text" className="form-control" id="description" name="description" value={note.description} onChange={onChange}/>
</div>
<div className="mb-3">
  <label htmlFor="tag" className="form-label">Tag</label>
  <input type="text" className="form-control" id="tag" name="tag" value={note.tag} onChange={onChange}/>
</div>
<button type="submit" disabled={note.title.length<5 || note.description.length<5} className="btn btn-primary" onClick={handleClick}>Submit</button>
</form>
    </div>
</div>
  )
}

export default Addnote