import React, { Component } from "react";

class AddNoteForm extends Component {
  render() {
    return (
      <React.Fragment>
        {/* add input field and submit button
               the input value should render on  */}
        <div>
          <textarea
            type="text"
            placeholder="Add notes here..."
            // defaultValue={this.state.task.note || ""}
            onChange={this.props.handleChange}
            name="note"
          />
        </div>
        {/* add onClick={this.props.createNewNote} to the add note button */}
         <button type="submit"  > 
          + Add Note
        </button>
        {/* add onClick={this.props.deleteNote} to the delete note button */}
        <button >
          <img
            src={"../images/deletetaskicon.png"}
            height="15px"
            weight="15px"
            alt=""
          />{" "}
        </button>
      </React.Fragment>
    );
  }
}

export default AddNoteForm;
