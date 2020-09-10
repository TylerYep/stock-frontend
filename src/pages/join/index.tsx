import React, { useState } from "react";
import firebase from "firebase";
// import Form from 'react-bootstrap/Form'

import { Formik, Field, Form, ErrorMessage, useFormik } from 'formik';
import * as Yup from 'yup';

import { useAuthState } from "react-firebase-hooks/auth";
import { useDocumentDataOnce, useCollectionDataOnce } from "react-firebase-hooks/firestore";

import { Button, Card } from "react-bootstrap";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import {JoinWithData} from './JoinWithData.js'
import SweetAlert from 'sweetalert2-react';

import { Redirect } from 'react-router-dom';
import { Loading } from '../../components/general/Loading';


export const JoinPage = ({}: {}) => {
  // alert(qId)
  // User = the user's profile from state (we need this for email)
  const [user] = useAuthState(firebase.auth());

  // keeps track of successful submit sweet alert
  const [submitAlert, setSubmitAlert] = useState(false);
  const [formSubmitted, setFormSubmiited] = useState(false);

  // useDocumentDataOnce says "get the document at this path once (dont update it if server data updates)"
  // serverData = the current document from the database (undefined if still loading)
  const [serverData, loading] = useDocumentDataOnce(firebase
    .firestore()
    .collection("users")
    .doc(`${user.email}`));

  // debugger
  if (loading) {
    return <Loading />;
  }

  let aboutData = (serverData != undefined && serverData['about']) ?
                  serverData['about'] :
                  {}

  const setAboutData = function(newValue) {
    firebase
      .firestore()
      .collection(`users`)
      .doc(`${user.email}`)
      .set(
        {about:newValue},
        // Merge true => don't delete other fields in this object
        { merge: true }
      ).then( () => {
          setSubmitAlert(true);
       }
      );
  }



  return (
    <div>
      <JoinWithData aboutData={aboutData} setAboutData={setAboutData}/>
      <SweetAlert
        show={submitAlert}
        title="Success"
        text="Your form has been successfully submitted!"
        type="success"
        onConfirm={() => {setSubmitAlert(false); setFormSubmiited(true);}}
      />
      {formSubmitted ? <Redirect to="#/" /> : <></>}
    </div>
  );
};
