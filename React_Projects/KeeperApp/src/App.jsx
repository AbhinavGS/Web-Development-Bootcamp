import React, { useState } from "react"
import Header from "./components/Header"
import Note from "./components/Note"
import Footer from "./components/Footer"
import CreateArea from "./components/CreateArea"

export default function App() {
    const [notesArr, setNotesArr] = useState([])

    function addNote(note) {
        setNotesArr(prevNotes => {
            return [...prevNotes, note]
        })
    }

    function deleteNote(id) {
        setNotesArr(prevNotes => {
            return prevNotes.filter((note, index) => {
                return index !== id;
            })
        })
    }

    return (
        <div>
            <Header />
            <CreateArea onAdd={addNote} />
            {notesArr.map((note, index) => {
                return (
                    <Note
                        id={index}
                        title={note.noteTitle}
                        content={note.noteContent}
                        onDelete={deleteNote}
                    />)
            })}
            <Footer />
        </div>
    )
}