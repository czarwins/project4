import React, { Component } from "react";
import axios from "axios";
import { CardText, CardTitle, CardBody } from "reactstrap";

class Note extends Component {
  state = {
    note: {
      note: ""
    }
  };

  handleChange = event => {
    const updatedState = { ...this.state.note };
    updatedState[event.target.name] = event.target.value;
    this.setState({ note: updatedState });
  };

  handleSubmit = (event, noteId) => {
    event.preventDefault();
    const payload = this.state.note;
    const projectId = this.props.match.params.projectId;
    const taskId = this.props.match.params.taskId;
    // const noteId = this.props.match.params.noteId;
    axios
      .patch(
        `/api/projects/${projectId}/tasks/${taskId}/notes/${noteId}`,
        payload
      )
      .then(() => this.props.getSingleProject);
  };
  render() {
    return (
      <React.Fragment>
        <CardBody>
          <CardTitle>Notes:</CardTitle>
        </CardBody>
        {this.props.notes &&
          this.props.notes.map((note, i) => {
            return (
              <div>
                <CardText key={i}>Note: {note.note}</CardText>
              </div>
            );
          })}
      </React.Fragment>
    );
  }
}

export default Note;
