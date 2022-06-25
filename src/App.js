import React, { Component } from "react";
import Header from "./Header.js";
import NoteList from "./NotesList";
// component so we can set the state
class App extends Component {
  // state set are searchText (referenced in header) and notes (referenced in note and notelist.js)
  state = {
    searchText: "search for notes...",
    notes: [
      {
        id: Date.now(),
        title: "",
        description: "",
        doesMatchSearch: true
      }
    ]
  };
  // add a method to add a new note
  addNote = () => {
    // add a new note
    const newNote = {
      id: Date.now(),
      title: "",
      description: "",
      doesMatchSearch: true
    };
    // add new note to existing notes array
    // can also do as such
    // const newNotes = [newNote, ...this.state.notes];
    // this.setState({ notes: newNotes})
    // below is shorter step
    this.setState({ notes: [newNote, ...this.state.notes] });
  };

  // method to add text to our notes
  onType = (editId, updatedKey, updateValue) => {
    // editId is id of the note that is edited
    // updatedKey is the title or description field
    // updatedValue is the value of what was updated

    // map over the array of notes
    const updatedNotes = this.state.notes.map((note) => {
      // if the note id isnt the edited note then return it as it was
      if (note.id !== editId) {
        return note;
        // otherwise
      } else {
        // if the title was updated
        if (updatedKey === "title") {
          // make the note.title the updateValue
          note.title = updateValue;
          // and return it
          return note;
          // otherwise
        } else {
          // update the value of the note.description
          note.description = updateValue;
          // and return the note
          return note;
        }
      }
    });
    // then.... set the state to the updated notes
    this.setState({ notes: updatedNotes });
  };

  // method to map over notes array for each note object
  onSearch = (text) => {
    // variable to store search text as lower case
    const newSearchText = text.toLowerCase();
    // function to map through all notes
    const noteObjects = this.state.notes.map((note) => {
      //  if there isnt any search text
      if (!newSearchText) {
        // then all notes return true and display them
        note.doesMatchSearch = true;
        return note;
        // otherwise
      } else {
        // store both title and description as lower case
        const lowerCaseTitle = note.title.toLowerCase();
        const lowerCaseDescription = note.description.toLowerCase();
        // variables to store if the title and description include the search text
        const titleMatch = lowerCaseTitle.includes(newSearchText);
        const descriptionMatch = lowerCaseDescription.includes(newSearchText);
        // variable to store if either title or description match search text
        const hasMatch = titleMatch || descriptionMatch;
        // if there is a match of search text and either title or description then display note
        note.doesMatchSearch = hasMatch;
        return note;
      }
    });
    // then set the state to
    this.setState({
      // the notes that match and the text that matches
      notes: noteObjects,
      searchText: newSearchText
    });
  };
  // function to remove notes once x is clicked
  removeNote = (noteId) => {
    // filtering through the notes and returning them as long as the noteId does not match the id of the note passed back to us
    const updatedNotes = this.state.notes.filter((note) => note.id !== noteId);
    // set the state of notes as this
    this.setState({ notes: updatedNotes });
  };
  // save the notes to local storage
  componentDidUpdate() {
    // variable to save stringified notes
    const stringifyNotes = JSON.stringify(this.state.notes);
    // send it to the local storage and name it
    localStorage.setItem("savedNotes", stringifyNotes);
  }
  // when the app reloads
  componentDidMount() {
    // store the get the notes from local storage
    const stringifiedNotes = localStorage.getItem("savedNotes");
    // if there are notes saved on local storage
    if (stringifiedNotes) {
      // take those notes back into jsx
      const savedNotes = JSON.parse(stringifiedNotes);
      // then set the state of notes to what was saved
      this.setState({ notes: savedNotes });
    }
  }
  render() {
    return (
      <div>
        {/* render the component and pass the state set above to the component */}
        {/* passing the addnote function to the header component so i can call the function onClick to the button */}
        <Header
          onSearch={this.onSearch}
          addNote={this.addNote}
          searchText={this.state.searchText}
        />
        {/* render the component and pass the state set above to component */}
        <NoteList
          removeNote={this.removeNote}
          onType={this.onType}
          notes={this.state.notes}
        />
      </div>
    );
  }
}

export default App;
