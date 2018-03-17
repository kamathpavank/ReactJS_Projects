import React, { Component } from 'react';

class ProjectItem extends Component {

  deleteProjects(id){
    this.props.onDelete(id);
  }

  render() {

    return (
      <li className="Project">
        {this.props.project.title} - {this.props.project.category}<a href="#" onClick={this.deleteProjects.bind(this, this.props.project.id)}> X</a>
      </li>
    );
  }
}

export default ProjectItem;
