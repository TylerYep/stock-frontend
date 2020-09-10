import React from "react";
import firebase from "firebase";
// import Form from 'react-bootstrap/Form'

import { Formik, Field, Form, ErrorMessage, useFormik } from 'formik';
import * as Yup from 'yup';

import { useAuthState } from "react-firebase-hooks/auth";
import { useDocumentDataOnce } from "react-firebase-hooks/firestore";

import { Button, Card } from "react-bootstrap";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import {JoinForm} from './JoinForm.js'
import {AboutNav} from './AboutNav.js'

export class JoinWithData extends React.Component {

  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }


  handleSubmit(values, { setSubmitting }) {
     this.props.setAboutData(values)
  }



  render() {

      return (
        <div>
          <div className="container container-narrow">
            <AboutNav />
          </div>
          <div style={{ width: '720px', maxWidth: '90vw', margin: 'auto', marginTop: '50px', marginBottom: '50px'}}>
              <Card style={{ margin: 'auto', padding: '20px'}}>
                <h1>Tell us about yourself</h1>
                 <p >
                  We want to get to know your better; tell us a little about yourself! We will use the answers in this form to figure out your background and determine whether this class is  a good fit for you.
                 </p>
                <div >
                    <JoinForm
                      aboutData={this.props.aboutData}
                      onSubmit={(e, cb) => this.handleSubmit(e,cb)}
                    />
                </div>
            </Card>
          </div>
        </div>
      );
  }
};