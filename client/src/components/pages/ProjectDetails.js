import React, { Component } from "react";
import axios from "axios";
import { withRouter } from "react-router";
import { Col } from "reactstrap";
import Sidebar from "../commons/Sidebar";
import SingleProject from "../Projects/SingleProject";
import { Link } from "react-router-dom";

const buttonStyle = {
  display: "block",
  marginBottom: "12px"
};

const projectHeaderStyle = {
  marginBottom: "24px",
  color: "white"
};

class ProjectDetails extends Component {
  state = {
    project: {},
    task: {},
    note: {},
    editFormVisible: false,
    addTaskVisible: false
  };

  componentDidMount() {
    this.getSingleProject();
  }

  getSingleProject = () => {
    const projectId = this.props.match.params.projectId;
    axios
      .get(`/api/projects/${projectId}`)
      .then(res => {
        this.setState({ project: res.data });
      })
      .catch(err => err);
  };

  deleteProject = () => {
    const projectId = this.props.match.params.projectId;
    axios
      .delete(`/api/projects/${projectId}`)
      .then(() => this.props.history.goBack())
      .catch(err => err);
  };

  toggleEditProjectForm = () => {
    this.setState({ editFormVisible: !this.state.editFormVisible });
  };

  toggleAddTaskForm = () => {
    this.setState({ addTaskVisible: !this.state.addTaskVisible });
  };
  handleEditChange = event => {
    const newState = { ...this.state.project };
    newState[event.target.name] = event.target.value;
    this.setState({ project: newState });
  };

  handleEditSubmit = event => {
    event.preventDefault();
    const payload = this.state.project;
    const projectId = this.props.match.params.projectId;
    axios.patch(`/api/projects/${projectId}/`, payload).then(res => {
      this.props.getSingleProject();
      this.props.toggleEditProjectForm();
    });
  };
  createNewTask = () => {
    // taskController Create route
    // update the state with the new tasks
    const projectId = this.props.match.params.projectId;
    axios
      .post(`/api/projects/${projectId}/tasks`, {
        title: "Sample Title",
        description: "Sample description this is just here as a test"
      })
      .then(res => {
        console.log(res.data);
        this.getSingleProject();
      });
  };

  deleteTask = () => {
    // event.preventDefault()
    const projectId = this.props.match.params.projectId;
    const taskId = this.props.match.params.taskId;
    console.log(taskId);
    axios.delete(`/api/projects/${projectId}/tasks/${taskId}`).then(() => {
      this.props.getSingleProject();
    });
  };

  handleChange = event => {
    const newState = { ...this.state.task };
    newState[event.target.name] = event.target.value;
    this.setState({ task: newState });
  };

  handleSubmit = event => {
    event.preventDefault();
    const payload = this.state.task;
    const projectId = this.props.match.params.projectId;
    axios.post(`/api/projects/${projectId}/tasks`, payload).then(res => {
      this.getSingleProject();
    });
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

  render() {
    return (
      <React.Fragment>
        <Col xs="3">
          <Sidebar>
            <h1 style={projectHeaderStyle}>
              Project: {this.state.project.projectname}
            </h1>
            <Link to="/projects">
              <button style={buttonStyle}>Back</button>
            </Link>
            <button style={buttonStyle} onClick={this.toggleAddTaskForm}>
              Add Task +
            </button>
            <button style={buttonStyle} onClick={this.toggleEditProjectForm}>
              Edit Project
            </button>
          </Sidebar>
        </Col>
        <Col xs="9">
          <SingleProject
            createNewNote={this.createNewNote}
            deleteNote={this.deleteNote}
            createNewTask={this.createNewTask}
            deleteTask={this.deleteTask}
            deleteProject={this.deleteProject}
            getSingleProject={this.getSingleProject}
            editFormVisible={this.state.editFormVisible}
            addTaskVisible={this.state.addTaskVisible}
            project={this.state.project}
            tasks={this.state.project.tasks}
            task={this.state.task}
            handleChange={this.handleChange}
            handleSubmit={this.handleSubmit}
            handleEditChange={this.handleEditChange}
            handleEditSubmit={this.handleEditSubmit}
            notes={this.state.task.notes}
            note={this.state.note}
          />
        </Col>
      </React.Fragment>
    );
  }
}

export default withRouter(ProjectDetails);
