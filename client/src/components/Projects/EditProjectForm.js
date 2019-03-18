import React, { Component } from 'react';
import axios from 'axios'
import { withRouter } from 'react-router-dom';

class EditProjectForm extends Component {
    state = {
        project: {
            projectname: '',
            description: ''
        }
    }

    handleEditChange = (event) => {
        const newState = { ...this.state.project }
        newState[event.target.name] = event.target.value
        this.setState({ project: newState })
    }

    handleEditSubmit = (event) => {
        event.preventDefault()
        const payload = this.state.project
        const projectId = this.props.projectId
        axios.patch(`/api/projects/${projectId}`, payload)
        .then((res) => {
            this.props.getSingleProject()
            this.props.toggleEditProjectForm()
            console.log(res.payload);
            
        }).catch(err => err)
    }

    render() {
        return (
            // null
            <div>
                <form onSubmit={this.props.handleEditSubmit}>
                    <div>
                        <input type="text"
                        placeholder="projectname"
                        name="projectname"
                        defaultValue={this.state.project.projectname || ''}
                        onChange={this.props.handleEditChange}
                        />
                    </div>
                    <div>
                        <input type="text"
                        placeholder="description"
                        defaultValue={this.state.project.description || ''}
                        onChange={this.props.handleEditChange}
                        name="description"/>
                    </div>
                    <button>Submit</button>
                </form>
            </div>
        );
    }
}

export default withRouter(EditProjectForm);