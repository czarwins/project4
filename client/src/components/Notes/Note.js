import React, { Component } from "react";
import axios from "axios";
import { CardText, CardTitle, CardBody } from "reactstrap";
import AddNoteForm from './AddNoteForm'

class Note extends Component {
  state = {
    note: {
      note: ""
    }
  };

  createNewNote = () => {
    // NoteController Create route
    // update the state with the new notes
    const projectId = this.props.match.params.projectId;
    const taskId = this.props.match.params.taskId;
    axios
      .post(`/api/projects/${projectId}/tasks/${taskId}/notes`, {
        note: "Test note."
      })
      .then(res => {
        console.log(res.data);
        this.getSingleProject();
      });
  };

  deleteNote = () => {
    // event.preventDefault()
    const projectId = this.props.match.params.projectId;
    const taskId = this.props.match.params.taskId;
    const noteId = this.props.match.params.noteId;
    console.log(noteId);
    axios
      .delete(`/api/projects/${projectId}/tasks/${taskId}/notes/${noteId}`)
      .then(() => this.props.history.goBack());
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
          <AddNoteForm
                  createNewNote={this.createNewNote}
                  deleteNote={this.deleteNote}
                  handleChange={this.handleChange}
                  handleSubmit={this.handleSubmit}
                  task={this.props.task}
                  note={this.state.note}
                  // notes={this.state.task.notes}
                />
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
