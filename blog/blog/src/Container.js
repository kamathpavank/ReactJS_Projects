import React, { Component } from 'react';
import Post from './Post';
class Container extends Component {
  render(){
    return(
      <div className="container">
        <Post/>
      </div>
    )
  }
}

export default Container;
