import React, { Component } from "react";
import ReactDOM from 'react-dom'
// import { Router, Link } from "@reach/router"
import Button from "react-bootstrap/Button";
import Navbar from "react-bootstrap/Navbar";
import Spinner from "react-bootstrap/Spinner";
import Nav from "react-bootstrap/Nav";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload } from "@fortawesome/free-solid-svg-icons";
import { faVial } from "@fortawesome/free-solid-svg-icons";
import firebase from "firebase";


import Swal from 'sweetalert2'

import Logo from "../../components/general/Logo.js";



export class SlJoinNav extends Component {


  render() {
    return (
      <Navbar bg="light" variant="dark" expand="sm">
        <Navbar.Brand href="#/sl" className="p-0" >
          <img 
            className="homeNav-logo" 
            src={process.env.PUBLIC_URL + '/stanford.png'}
            alt="logo"
          />
          {/*CS106<span style={{fontSize:24}}>&forall;</span>*/}
          <span className="text-dark">Back to onboarding home</span>
          
          {/*this.renderBack()*/}
        </Navbar.Brand>

        <Nav className="mr-auto"></Nav>

        <Nav className="mr-auto">
          {/*<Form className="mr-2">
            <FormControl
              className="examMakerNav-title"
              type="text"
              value={'Hello'}
            />
          </Form>*/}
        </Nav>
        <Nav className="ml-auto">
          <Button variant="outline-secondary"  onClick={() => firebase.auth().signOut()}>Signout</Button>
        </Nav>
      </Navbar>
    );
  }
}
