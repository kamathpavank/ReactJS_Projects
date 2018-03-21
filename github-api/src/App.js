import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import './App.css';
import Github from './Github';
import Header from './Components/Header';
import Auth0Lock from 'auth0-lock';

class App extends Component {

  constructor(props){
    super(props);

    this.state = {
      accessToken: '',
      profile: {}
    };
  }

  static defaultProps = {
    clientID : 'omBNDNS2qIaixZZ04gvqfpmBU5jwiTVX',
    domain : 'githubviewer.auth0.com'
  }

  componentWillMount(){
    this.lock = new Auth0Lock(this.props.clientID, this.props.domain);
    //For Siged In
    this.lock.on('authenticated', (authResult) => {

      this.lock.getProfile(authResult.accessToken, (error, profile) => {
        if(error){
          console.log(error);
          return;
        }

        // console.log(profile);

        this.setProfile(authResult.accessToken, profile);
      });

    });
    //If Already Logged In
    this.getProfile();
  }

setProfile(accessToken, profile){
  localStorage.setItem('accessToken', accessToken);
  localStorage.setItem('profile', JSON.stringify(profile));

  this.setState({
    accessToken: localStorage.getItem('accessToken'),
    profile: JSON.parse(localStorage.getItem('profile'))
  });
}

  showLock(){
    this.lock.show();
  }


    onLogout(){
      this.setState({
        accessToken: '',
        profile: ''
      }, () => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('profile');
      });
    }


  getProfile(){
    if(localStorage.getItem('accessToken') != null){

        this.setState({
          accessToken: localStorage.getItem('accessToken'),
          profile: JSON.parse(localStorage.getItem('profile'))
        }, () => {
          console.log(this.state)
        });
    }
  }


  render() {
    let git;

    if(this.state.accessToken){
      git = <Github/>
    } else{
      git ="Click on Login to view Github Viewer"
    }

    return (
      <div className="App">
        <Header
          lock={this.lock}
          accessToken={this.state.accessToken}
          onLogin={this.showLock.bind(this)}
          onLogout = {this.onLogout.bind(this)}
          />
        {git}
      </div>
    );
  }
}

export default App;
