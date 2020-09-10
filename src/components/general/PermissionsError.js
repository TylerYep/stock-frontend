import React, { Component } from "react";
import './loading.css';
import firebase from "firebase";
import Button from 'react-bootstrap/Button';



export class PermissionsError extends Component {

  componentWillMount() {
    document.title = "Page not found";
  }

  render() {
    return (
      <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center', margin: 'auto', marginTop: '30px', width: '80vw'}}>
      <h1>Page not found</h1>
      <p>
        Oops something went wrong and we couldn't display this page.

      </p>
      <Button onClick={() => firebase.auth().signOut()}>Sign out</Button>
      </div>
    )
  }

}
