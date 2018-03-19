import React, {Component} from 'react';
const firebase = require('firebase');

var config = {
   apiKey: "AIzaSyA0h8hO6rWBWL0jBpnM2nYxs_kxtxO-zFQ",
   authDomain: "usurvey-d7cee.firebaseapp.com",
   databaseURL: "https://usurvey-d7cee.firebaseio.com",
   projectId: "usurvey-d7cee",
   storageBucket: "usurvey-d7cee.appspot.com",
   messagingSenderId: "105870555617"
 };
 firebase.initializeApp(config);



class Auth extends Component {

  signup(e){
    const email = this.refs.email.value;
    const password = this.refs.password.value;

    const auth = firebase.auth();

    const promise = auth.createUserWithEmailAndPassword(email, password);

    promise
    .then(user => {
      var err = "Welcome" + user.email;
      firebase.database().ref('users/'+user.uid).set({
        email: user.email
      });
      this.setState({err: err});
    })
    .catch(e=> {
      var err = e.message;
      console.log(err);
      this.setState({err: err})
    })
  }

  login(e){
    const email = this.refs.email.value;
    const password = this.refs.password.value;

    const auth = firebase.auth();

    const promise = auth.signInWithEmailAndPassword(email, password);

    promise.then(user => {
      var lout = document.getElementById('logout');
      var msg = "Welcome Back\t" + user.email;
      this.setState({err: msg});
      lout.classList.remove('hide');
    })

    promise.catch(e => {
      var err = e.message;
      this.setState({err: err});
      console.log(err)
    });
    }

    logout(){
      firebase.auth().signOut();
      var lout = document.getElementById('logout');

      var msg = "Thanks for using our app";
      this.setState({err: msg})

      lout.classList.add('hide');
    }

    google(){
      var provider = new firebase.auth.GoogleAuthProvider();
       var promise = firebase.auth().signInWithPopup(provider);

       promise
       .then(result => {
         var user = result.user;
         firebase.database().ref("users/"+user.uid).set({
           email: user.email,
           name: user.displayName
         });
       })
       .catch(e => {
         var msg = e.message;
         this.setState({err: msg})
       })
    }

  constructor(props){
    super(props);

    this.state = {
      err: ''
    };
    this.login = this.login.bind(this);
    this.signup = this.signup.bind(this);
    this.logout = this.logout.bind(this);
  }
  render(){
    return(
      <div>
        <input id="emial" ref="email" type="email" placeholder="Enter your email"/><br/>
        <input id="pass" ref="password" type="password" placeholder="Enter your password"/><br/>
        <p> {this.state.err} </p>
        <button onClick={this.login}>Log In</button>
        <button onClick={this.signup}>Sign Up</button>
        <button id="logout" className="hide" onClick={this.logout}>Log Out</button><br/>
        <button id="google" onClick={this.google.bind(this)}>Sign in with Google</button>
      </div>
    )
  }
}

export default Auth;
