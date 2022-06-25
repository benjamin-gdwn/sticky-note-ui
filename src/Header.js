import React from "react";
// pass props to the header so we can set the value of the search bar
const Header = (props) => {
  // function created to store the input value
  const callSearch = (e) => {
    // using props to call the function passed down from app.js
    props.onSearch(e.target.value);
  };
  return (
    <header className="app-header">
      <h1 className="app-header__title">Super Sticky Notes</h1>
      <aside className="app-header__controls">
        {/* pass the addnote function from app.js */}
        <button className="add-new" onClick={props.addNote}>
          + New Note
        </button>
        <input
          className="search"
          type="text"
          placeholder="Type here to search..."
          // set the value to props.searchText which is a state set up in APP.JS
          value={props.searchText}
          // pass the callSearch function above which uses the onsearch function from app.js
          onChange={callSearch}
        />
      </aside>
    </header>
  );
};

export default Header;
