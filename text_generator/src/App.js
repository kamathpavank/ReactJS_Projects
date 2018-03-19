import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import Output from './Components/Output';
import Select from './Components/Controls/Select';
import Text from './Components/Controls/Text';



class App extends Component {
  constructor(props){
    super(props);

    this.state = {
      paras: 4,
      html: true,
      text: ''
    };
  }

  componentWillMount(){
    this.getSampleText();
  }

  getSampleText(){
    //Get data from api and insert it in state
    axios.get(' http://hipsterjesus.com/api?paras='+this.state.paras+'&html='+this.state.html)
    .then((response) => {
      this.setState({text: response.data.text}, function(){
        console.log(this.state)
      });
    })
    .catch((err) => {
      console.log(err)
    });
  }

  showHtml(x){
    //this changes state html value and makes api call these values
    this.setState({html:x}, this.getSampleText)
  }

  changeParas(x){
    //this changes state paras value and makes api call these values
    this.setState({paras:x}, this.getSampleText)
  }

  render() {
    return (
      <div className="App container">
        <h1 className="text-center">Text Generator</h1>
        <hr/>
        <form className="form-inline">
          <div className="form-group">
            <labe>Paragraphs</labe>
            {/*pass the para value to text component and set state paras value*/}
            <Text value={this.state.paras} onChange={this.changeParas.bind(this)}/>
          </div>

          <div className="form-group">
            <labe>Include Html:</labe>
            {/*pass yes or no to Select component and set state html value*/}
            <Select value={this.state.html} onChange={this.showHtml.bind(this)}/>
          </div>
        </form>
        <br/>
        <br/>
        <Output value={this.state.text}/>
      </div>
    );
  }
}

export default App;
