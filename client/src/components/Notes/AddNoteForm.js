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
        <button type="submit" onClick={this.props.createNewNote}>
          + Add Note
        </button>
        <button onClick={this.props.deleteNote}>
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
