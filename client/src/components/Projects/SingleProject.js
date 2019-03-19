import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import EditProjectForm from "./EditProjectForm";
import Note from "../Notes/Note";
import { Card, CardText, CardBody, CardTitle, Button, Col } from "reactstrap";

class SingleProject extends Component {
  render() {
    return (
      <React.Fragment>
        {this.props.addTaskVisible && (
          <form onSubmit={this.props.handleSubmit}>
            <br />
            <div>
              <input
                type="text"
                placeholder=" TITLE"
                name="title"
                value={this.props.task.title || ""}
                onChange={this.props.handleChange}
              />
            </div>
            <br />
            <div>
              <textarea
                type="text"
                placeholder=" DESCRIPTION"
                value={this.props.task.description || ""}
                onChange={this.props.handleChange}
                name="description"
              />
            </div>
            <button>Submit</button>
          </form>
        )}

        <br />
        <EditProjectForm
          handleEditChange={this.handleEditChange}
          handleEditSubmit={this.handleEditSubmit}
        />
        <Col xs="9">
          {this.props.tasks &&
            this.props.tasks.map((task, i) => {
              return (
                <Card key={i}>
                  <CardBody>
                    <CardTitle>Title: {task.title}</CardTitle>
                    <CardText>Description: {task.description}</CardText>
                    <Link to={`/projects/:projectId`} />
                    <Button onClick={this.props.deleteTask}>
                      <img
                        src={"../images/deletetaskicon.png"}
                        height="15px"
                        weight="15px"
                        alt=""
                      />
                    </Button>
                  </CardBody>
                  <Note
                    // notes={this.state.task.notes}
                    // note={this.state.note}
                    createNewNote={this.createNewNote}
                    deleteNote={this.deleteNote}
                  />
                </Card>
              );
            })}
        </Col>
      </React.Fragment>
    );
  }
}

export default withRouter(SingleProject);
