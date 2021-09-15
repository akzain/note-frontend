import React, { useState, useEffect } from "react";
import { ReactComponent as ArrowLeft } from "../assets/arrow-left.svg";
import { Link } from "react-router-dom";
import Loader from "react-loader-spinner";


const NotePage = ({ match, history }) => {
    let noteId = match.params.id;
    let [note, setNote] = useState(null);

    useEffect(() => {
        getNote();
    }, [noteId]);

    let getNote = async () => {
        if (noteId === "new") return;

        let response = await fetch(
            `https://notesschoolzainkamaalahmed.herokuapp.com${noteId}/`
        );
        let data = await response.json();
        setNote(data);
    };

    let createNote = async () => {
        fetch(`https://notesschoolzainkamaalahmed.herokuapp.com/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(note),
        });
    };

    let updateNote = async () => {
        fetch(`https://notesschoolzainkamaalahmed.herokuapp.com/${noteId}/`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(note),
        });
    };

    let deleteNote = async () => {
        fetch(`https://notesschoolzainkamaalahmed.herokuapp.com/${noteId}/`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
        });
        setTimeout(() => {
            history.push("/");
        }, 1000);
    };

    let handleSubmit = () => {
        console.log("NOTE:", note);
        if (noteId !== "new" && note.body == "") {
            deleteNote();
        } else if (noteId !== "new") {
            updateNote();
        } else if (noteId === "new" && note.body !== null) {
            createNote();
        }
        history.push("/");
    };

    let handleChange = (value) => {
        setNote((note) => ({ ...note, note: value }));
        console.log("Handle Change:", note);
    };

    return (
        <div className="note">
            {noteId !== "new" ? (
                <div className="note-header">
                    <h3>
                        <ArrowLeft onClick={handleSubmit} />
                    </h3>
                    <button onClick={deleteNote}>Delete</button>
                </div>
            ) : (
                <div className="note-header">
                    <Link to="/">Home</Link>
                    <button onClick={handleSubmit}>Done</button>
                </div>
            )}
            <Loader
                type="Puff"
                color="#00BFFF"
                height={100}
                width={100}
                timeout={3000} //3 secs
            />
            <textarea
                onChange={(e) => {
                    handleChange(e.target.value);
                }}
                value={note?.note}
            ></textarea>
        </div>
    );
};

export default NotePage;
