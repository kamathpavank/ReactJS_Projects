import React, { Component } from 'react';
import ProjectItem from './ProjectItem';
import uuid from 'uuid'

class AddProject extends Component {
  constructor(props){
    super(props);

    this.state = {
      newProject:{}
    };
  }
  static defaultProps = {
    categories: ['Web Design', 'Web Development', 'App Development']
  }
  //on submit
  handleSubmit(e){
    //check if title field is empty
    if(this.refs.title.value === ''){
      alert("title is required")
    }
    //add new valuse to state
    else{
      this.setState({newProject:{
        id : uuid.v4(),
        title: this.refs.title.value,
        category: this.refs.category.value
      }},function() {
        //console.log(this.state)
        //Pass new projec data to App.js as function
        this.props.addProject(this.state.newProject);
      });
    }
    e.preventDefault();
  }

  render() {
    //loop through each category and return it as option tag
    let categoryOptions = this.props.categories.map(category =>{
      return <option key={category} values={category}>{category}</option>
    })
    return (
      <div>
        <h3>Add Projects</h3>
        <form onSubmit={this.handleSubmit.bind(this)}>
          <div>
            <label>Title</label><br/>
            <input type="text" ref="title"/>
          </div>

          <div>
            <label>Category</label><br/>
            <select  ref="category">
              {categoryOptions}
            </select>
          </div>
          <br/>
          <input type="submit" value="Submit"/>
        </form>
      </div>
    );
  }
}

export default AddProject;
