import { React, useContext, useEffect, useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import NoteContext from '../Context/notes/noteContext'
import Addnote from './Addnote'
import Notesitem from './Notesitem'


const Notes = (props) => {
  const {showalert}=props;
  let navigate=useNavigate()
  const Context = useContext(NoteContext)
  const { notes, getallnotes,editNote } = Context;
  useEffect(() => {
    if(localStorage.getItem('token')){
      getallnotes()
    }
    else{
      navigate('/login')
    }
  },);

  const ref = useRef(null)
  const closeref=useRef(null)
  const [note, setNotes] = useState({id:"",etitle: "", edescription: "", etag: "" })
  const updateNote = (currentNote) => {
    ref.current.click();
    setNotes({id:currentNote._id ,etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag })
    
  }
  const handleClick = (e) => {
    console.log("Updated: ", note)
    editNote(note.id,note.etitle,note.edescription,note.etag)
    closeref.current.click()
    props.showalert("Updated Successfully","success")
  }
  const onChange = (e) => {
    setNotes({ ...note, [e.target.name]: e.target.value })
  }


  return (
    <div className='container'>
      <Addnote showalert={showalert} />

      {/* //modal for editNote */}
      <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
        Launch demo modal
      </button>
      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
            <h1 className="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="etitle" className="form-label">Title</label>
                  <input type="text" className="form-control" id="etitle" name="etitle" value={note.etitle} aria-describedby="emailHelp" onChange={onChange} />
                </div>
                <div className="mb-3">
                  <label htmlFor="edescription" className="form-label">Description</label>
                  <input type="text" className="form-control" id="edescription" name="edescription" value={note.edescription} onChange={onChange} />
                </div>
                <div className="mb-3">
                  <label htmlFor="etag" className="form-label">Tag</label>
                  <input type="text" className="form-control" id="etag" name="etag" value={note.etag} onChange={onChange} />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button type="button"  ref={closeref} className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button"  className="btn btn-primary" onClick={handleClick}>Edit Note</button>
            </div>
          </div>
        </div>
      </div>

      {/* //displaying notes */}
      <div className='row my-3'>
        <h2>Your Notes</h2>
        <div className='container'> 
        {notes.length===0 && 'No Notes to Display'}
         </div>
        {notes.map((note) => {
          return <Notesitem key={note._id} updateNote={updateNote} note={note} showalert={showalert} />
        })}
      </div>
    </div>
  )
}

export default Notes
