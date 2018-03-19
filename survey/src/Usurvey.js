import React, {Component} from 'react';
const firebase = require('firebase');
const uuid = require('uuid');

//Firebase Configuration
var config = {
   apiKey: "AIzaSyA0h8hO6rWBWL0jBpnM2nYxs_kxtxO-zFQ",
   authDomain: "usurvey-d7cee.firebaseapp.com",
   databaseURL: "https://usurvey-d7cee.firebaseio.com",
   projectId: "usurvey-d7cee",
   storageBucket: "usurvey-d7cee.appspot.com",
   messagingSenderId: "105870555617"
 };
 firebase.initializeApp(config);

class Usurvey extends Component {

  questionSubmit(){
    //Create a object with unique id in firebase on submit
    firebase.database().ref('uSurvey/'+this.state.uid).set({
      studentName: this.state.studentName,
      answers: this.state.answers
    });
    this.setState({isSubmitted: true});

  }

  answerSelected(e){
    //set each selected answer in state object
    var answers = this.state.answers;
    if(e.target.name === 'answer1'){
      answers.answer1 = e.target.value;
    }else if (e.target.name === 'answer2') {
      answers.answer2 = e.target.value;
    }else if (e.target.name === 'answer3') {
      answers.answer3 = e.target.value;
    }else if (e.target.name === 'answer4') {
      answers.answer4 = e.target.value;
    }else if (e.target.name === 'answer5') {
      answers.answer5 = e.target.value;
    }
    this.setState({answers: answers}, function(){
      console.log(this.state)
    })
  }

  nameSubmit(event){
    var studentName = this.refs.name.value;
    this.setState({studentName: studentName}, function() {
      console.log(this.state)
    });
  }

  constructor(props){
    super(props);

    this.state = {
      uid: uuid.v1(),
      studentName: '',
      answers:{
        answer1: '',
        answer2: '',
        answer3: '',
        answer4: '',
        answer5: ''
      },
      isSubmitted: false
    };
    this.nameSubmit = this.nameSubmit.bind(this);
    this.answerSelected = this.answerSelected.bind(this);
    this.questionSubmit = this.questionSubmit.bind(this);
  }

  render(){
    var studentName;
    var questions;

    if(this.state.studentName === '' && this.state.isSubmitted === false){
      studentName = <div>
        <h1>Please let us know your name</h1>
        <form onSubmit={this.nameSubmit}>
          <input className="nany" type="text" placeholder="Enter your name" ref="name"></input>
        </form>
      </div>;
      questions = ''
    }else if (this.state.studentName !=='' && this.state.isSubmitted === false) {
      studentName = <h1>Welcome to Uservey, {this.state.studentName}</h1>;
      questions = <div>
        <h2>Here are some questions</h2>
        <form onSubmit={this.questionSubmit}>
          <div className="card">
            <label>What kind of courses you like the most:</label><br/>
            <input type="radio" name="answer1" value="Technology" onChange={this.answerSelected}/>Technology
            <input type="radio" name="answer1" value="Design" onChange={this.answerSelected}/>Design
            <input type="radio" name="answer1" value="Marketing" onChange={this.answerSelected}/>Marketing
          </div>

          <div className="card">
            <label>You are a:</label><br/>
            <input type="radio" name="answer2" value="Student" onChange={this.answerSelected}/>Student
            <input type="radio" name="answer2" value="Job" onChange={this.answerSelected}/>Job
            <input type="radio" name="answer2" value="looking-job" onChange={this.answerSelected}/>looking-job
          </div>

          <div className="card">
            <label>Is online learning helpful</label><br/>
            <input type="radio" name="answer3" value="Yes" onChange={this.answerSelected}/>Yes
            <input type="radio" name="answer3" value="No" onChange={this.answerSelected}/>No
            <input type="radio" name="answer3" value="Maybe" onChange={this.answerSelected}/>Maybe
          </div>

          <div className="card">
            <label>Are the Prices affordable</label><br/>
            <input type="radio" name="answer4" value="Yes" onChange={this.answerSelected}/>Yes
            <input type="radio" name="answer4" value="No" onChange={this.answerSelected}/>No
            <input type="radio" name="answer4" value="Maybe" onChange={this.answerSelected}/>Maybe
          </div>

          <div className="card">
            <label>Are u happy with the content of courses</label><br/>
            <input type="radio" name="answer5" value="Yes" onChange={this.answerSelected}/>Yes
            <input type="radio" name="answer5" value="No" onChange={this.answerSelected}/>No
            <input type="radio" name="answer5" value="Maybe" onChange={this.answerSelected}/>Maybe
          </div>


          <input className="feedback-button" type="submit" value="submit"/>
        </form>
      </div>;
    } else if (this.state.isSubmitted === true) {
      studentName = <h1>Thanks, {this.state.studentName}</h1>
    }else if(this.state.studentName === '' && this.state.isSubmitted === true){
      studentName = <div>
        <h1>Invalid Name</h1>
        <form onSubmit={this.nameSubmit}>
          <input className="nany" type="text" placeholder="Enter your name" ref="name"></input>
        </form>
      </div>;
      questions = ''
    }

    return(
      <div>
      {studentName}
      ----------------------------------------------------
      {questions}
      </div>
    )
  }
}

export default Usurvey;
