import React, { useState } from "react"
import AddIcon from '@mui/icons-material/Add';
import Fab from '@material-ui/core/Fab'
import Zoom from '@material-ui/core/Zoom'

export default function CreateArea(props) {
    const [isExpanded, setIsExpanded] = useState(false)

    const [note, setNote] = useState({
        noteTitle: "",
        noteContent: ""
    })


    function handleChange(event) {
        const { value, name } = event.target;

        setNote((prevValue) => {
            if (name === "title") {
                return {
                    noteTitle: value,
                    noteContent: prevValue.noteContent
                }
            } else if (name === "content") {
                return {
                    noteTitle: prevValue.noteTitle,
                    noteContent: value
                }
            }
        }
        )
    }

    function submitNote(event) {
        props.onAdd(note)
        event.preventDefault();   // prevent default bahaviour of submit of refreshing whole page //
        setNote({
            noteTitle: "",
            noteContent: ""
        })
    }

    function expand() {
        setIsExpanded(true)
    }


    return (
        <div>
            <form className="create-note">
                {isExpanded && <input onChange={handleChange} value={note.noteTitle} name="title" placeholder="Title" />}
                <textarea onClick={expand} onChange={handleChange} value={note.noteContent} name="content" placeholder="Take a note..." rows={isExpanded ? "3" : "1"}></textarea>
                <Zoom in={isExpanded}>
                    <Fab onClick={submitNote}><AddIcon /></Fab>
                </Zoom>
            </form>
        </div>
    )
}