import React, { Component } from 'react';
import TodoItem from './TodoItem'

class Todos extends Component {

  render() {
    let todoItems;
    if(this.props.todos){
        todoItems = this.props.todos.map(todo =>{
        return(
          //Project item renders ech todo inot list item and stores it ito todoItems variable
          <TodoItem key={todo.title} todo={todo}/>
        );
      });
    }
    return (
      <div className="Projects">
        <h3>Todo List</h3>
        {todoItems}
      </div>
    );
  }
}

export default Todos;
