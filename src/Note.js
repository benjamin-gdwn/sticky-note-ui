import React from "react";

// set up the note with props
const Note = (props) => {
  // create two identical functions one for title one for description
  const updateTitle = (e) => {
    // store the target value
    const updatedValue = e.target.value;
    // store the note id
    const editMeId = props.note.id;
    // using the onType method from app.js give it the target value, the title and the edited note id
    props.onType(editMeId, "title", updatedValue);
  };

  const updateDescription = (e) => {
    const updatedValue = e.target.value;
    const editMeId = props.note.id;
    props.onType(editMeId, "description", updatedValue);
  };
  // function to delete notes
  const clickDelete = () => {
    // call the function that was created in app.js and passed down to notelist and note.js
    props.removeNote(props.note.id);
  };

  return (
    <li className="note">
      {/* set the value of the title as the props title */}
      <input
        type="text"
        placeholder="Title"
        className="note__title"
        value={props.note.title}
        onChange={updateTitle}
      />
      {/* set the value of the description of the note as the props description */}
      <textarea
        placeholder="Description..."
        className="note__description"
        value={props.note.description}
        onChange={updateDescription}
      />
      <span className="note__delete" onClick={clickDelete}>
        X
      </span>
    </li>
  );
};

export default Note;
