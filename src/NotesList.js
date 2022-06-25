import React from "react";
import Note from "./Note.js";

// display the list of notes
const NoteList = (props) => {
  // setting up a function using the boolean value doesMatchSearch
  const findSearch = (note) => note.doesMatchSearch;
  // filtering that value
  const searchMatches = props.notes.filter(findSearch);
  // function that will display the notes based on note and id
  const renderNote = (note) => (
    // pass the ontype method from app all the way down to notes
    <Note
      removeNote={props.removeNote}
      onType={props.onType}
      note={note}
      key={note.id}
    />
  );
  // map through those notes to find those that match
  const noteElements = searchMatches.map(renderNote);
  // display those notes
  return <ul className="notes-list">{noteElements}</ul>;
};

export default NoteList;
