import React, { Component } from "react";
import styled from "styled-components";
import axios from "axios";

const TaskCard = styled.form`
  height: 200px;
  width: 200px;
  background-color: beige;
  margin: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;

  input {
    background-color: beige;
  }

  textarea {
    background-color: beige;
  }
`;

const FlexContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

class Task extends Component {
  state = {
    task: {
      title: "",
      description: ""
    }
  };

  // handleChange = (event) => {
  //     const newState = {...this.state.comment}
  //     newState[event.target.name] = event.target.value
  //     this.setState({ comment: newState})
  // }
  handleChange = event => {
    const updatedState = { ...this.state.task };
    updatedState[event.target.name] = event.target.value;
    this.setState({ task: updatedState });
  };

  handleSubmit = (event, taskId) => {
    event.preventDefault();
    const payload = this.state.task;
    axios
      .patch(`/api/tasks/${taskId}`, payload)
      .then(() => this.props.getSingleProject);
  };
  // deleteTask = () => {
  //     // event.preventDefault()
  //     const projectId = this.props.match.params.projectId
  //     const taskId = this.props.match.params.taskId
  //     console.log(taskId)
  //     axios.delete(`/api/projects/${projectId}/tasks/${taskId}`).then(() => {
  //         this.props.getSingleProject()
  //     })
  // }

  deleteTask = (event, projectId, taskId) => {
    event.preventDefault();
    // const projectId = this.props.match.params.projectId
    console.log(projectId);
    console.log(taskId);
    axios.delete(`/api/projects/${projectId}/tasks/${taskId}`)
      .then(() => this.props.history.goBack());
  };

  // deleteProject = () => {
  //     const projectId = this.props.match.params.projectId
  //     axios.delete(`/api/projects/${projectId}`)
  //         .then(() => this.props.history.goBack())
  // }
  // `/api/projects/${projectId}/tasks/${taskId}`
  render() {
    return (
      <FlexContainer>
        {this.props.project.tasks.map((task, i) => (
          <TaskCard
            onBlur={event => this.handleSubmit(event, task._id)}
            key={i}
          >
            <div>
              <input
                onChange={event => this.handleChange(event, task._id)}
                type="text"
                name="title"
                value={task.title}
              />
            </div>
            <div>
              <textarea
                onChange={event => this.handleChange(event, task._id)}
                type="text"
                name="description"
                value={task.description}
              />
            </div>
            <button
              onClick={this.props.deleteTask}
            >
              x
            </button>
          </TaskCard>
        ))}
      </FlexContainer>
    );
  }
}

export default Task;
