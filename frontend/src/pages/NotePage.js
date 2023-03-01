import React, {useState, useEffect} from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { ReactComponent as ArrowLeft } from '../assets/arrow-left.svg'


const NotePage = ({ match }) => {
  
  const param = useParams()
  const navigate = useNavigate();
  let [note, setNote] = useState(null)

  useEffect(()=>{
    getNote()
  }, [param.id])

  let getNote = async () => {
    if (param.id === 'new') return

    let response = await fetch(`/api/notes/${param.id}`)
    let data = await response.json()
    setNote(data)
}

  let createNote = async () => {
    fetch(`/api/notes`, {
        method: "POST",
        headers:{
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(note)
    })
  }

  let updateNote = async () => {
    fetch(`/api/notes/${param.id}`, {
        method: "PUT",
        headers:{
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(note)
    })
  }

  let deleteNote = async () => {
    fetch(`/api/notes/${param.id}`, {
        method: 'DELETE', 
        headers: {
            'Content-Type': 'application/json'
        }
    })
    navigate('/')
  }


  let handleSubmit = () => {
    console.log('NOTE:', note)
    if (param.id !== 'new' && note.body == '') {
        deleteNote()
    } else if (param.id !== 'new') {
        updateNote()
    } else if (param.id === 'new' && note.body !== null) {
        createNote()
    }
    navigate('/')
}

  let handleChange = (value) => {
    setNote(note => ({ ...note, 'body': value }))
    console.log('Handle Change:', note)
  }


  return (
    <div className='note'>
        <div className='note-header'>
            <h3>
                    <ArrowLeft onClick={handleSubmit}/>                                   
            </h3>
            {param.id !== 'new' ? (
              <button onClick={deleteNote}>Delete</button>               
            ): (
              <button onClick={handleSubmit}>Done</button>
            )}
        </div>        
        <textarea onChange={(e) => { handleChange(e.target.value) }} value={note?.body}></textarea>
    </div>
  )
}

export default NotePage