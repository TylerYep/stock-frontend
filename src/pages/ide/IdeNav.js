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

import {Reference} from './Reference.js'

import Swal from 'sweetalert2'

import Logo from "../../components/general/Logo.js";

const referenceHtml = document.createElement('div');
ReactDOM.render(<Reference />, referenceHtml);


class IdeNav extends Component {
  karelReference() {
    Swal.fire({
      html: referenceHtml,
      width:650
    })
  }

  questionFAQ() {
    Swal.fire({
      html:this.props.faqHtml,
      width:850
    })
  }

  render() {
    const buttonText = this.props.isDownloadDisabled
      ? "Downloading..."
      : "Download";
    return (

      <Navbar bg="dark" variant="dark" expand="sm">
        <Navbar.Brand href="#/course">Code in Place</Navbar.Brand>

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
          {
            (this.props.isMobile != undefined && !this.props.isMobile) &&
            <span>
              {
                this.props.faqHtml && 
                <Button variant="light mr-2" onClick={() => this.questionFAQ()}>Question FAQ</Button>
              }
              
              <Button variant="light mr-2" onClick={() => this.karelReference()}>Karel Reference</Button>
            </span>
          }
        <Button onClick={() => firebase.auth().signOut()}>Signout</Button>
        </Nav>
      </Navbar>
    );
  }
}

export default IdeNav;
