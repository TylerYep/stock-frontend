import React, { Component } from "react";
import { Button } from "react-bootstrap";
import firebase from "firebase";

export class ComingSoon extends Component {

  componentWillMount() {
    document.title = "Coming Soon";
  }

  render() {
    return (
      <div class="full-screen black-background">
        <div class="d-flex justify-content-center w-100 h-100">
          <div class="d-flex flex-column justify-content-center h-100">
            <div class="card">
              
              <div class="card-body">
                <center>
                <h1 >Email saved</h1>
                <h3>Application coming soon</h3>
                <p class="card-text">We will send you a message to you once the application is ready.</p>
                </center>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
  
}
