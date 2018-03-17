import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Projects from './Components/Projects';
import AddProject from './Components/AddProject';
import uuid from 'uuid';
import  $ from 'jquery';
import Todos from './Components/Todos'
class App extends Component {

  constructor(props){
    super(props);

    this.state = {
      projects:[],
      todos:[]
    };
  }
  //get data from api
  getTodo(){
    $.ajax({
      url: 'https://jsonplaceholder.typicode.com/todos',
      dataType: 'json',
      cache: false,
      success: function (data) {
        //store the apis data to state
        this.setState({todos: data}, function () {
            console.log(this.state)
        });
      }.bind(this),
      error: function (xhr, status, err) {
        console.log(err);
      }
    });
  }

  getProjects(){
    this.setState({
      projects:[
        {
          id : uuid.v4(),
          title:"Business Website",
          category: "Web Design"
        },
        {
          id : uuid.v4(),
          title:"Social App",
          category: "App Dev"
        },
        {
          id : uuid.v4(),
          title:"Ecommerce Shopping Cart",
          category: "Web Development"
        }
      ]
    });
  }

  componentWillMount(){
    this.getProjects();
    this.getTodo();
  }

  componentDidMount(){
    this.getTodo();
  }

handleAddProject(project){
  let projects = this.state.projects;
  projects.push(project);
  this.setState({projects:projects});
}

handleDeleteProject(id){
  let projects = this.state.projects;
  let index =projects.findIndex(c => c.id === id)
  projects.splice(index, 1);
  this.setState({projects:projects});
}

  render() {
    return (
      <div className="App">
      <AddProject addProject={this.handleAddProject.bind(this)}/>
      <Projects projects={this.state.projects} onDelete={this.handleDeleteProject.bind(this)}/>
      <hr/>
      <Todos todos={this.state.todos}/>
      </div>
    );
  }
}

export default App;
