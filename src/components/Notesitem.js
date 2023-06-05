import React,{useContext} from 'react'
import NoteContext from '../Context/notes/noteContext'


const Notesitem = (props) => {
    const Context=useContext(NoteContext)
    const {deleteNote}=Context;
    const {note,updateNote}=props;
  return (
    <div className='col-md-3'>
        <div className='card my-3'>
            <div className='card-body'>
            <h5 className='card-title'>{note.title}</h5>
            <p className='card-text'>{note.description}</p>
            {/* <p className='card-text'>{note.tag}</p> */}
            <i className="fa-solid fa-trash mx-3" onClick={()=>{deleteNote(note._id);
            props.showalert("Deleted Successfully","success")}}></i>
            <i className="fa-sharp fa-solid fa-pen-to-square mx-3" onClick={()=>{updateNote(note)}}></i>
            </div>
        </div>
        
    </div>
  )
}

export default Notesitem