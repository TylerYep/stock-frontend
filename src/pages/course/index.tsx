import React, { useState, useEffect, Component } from "react";
import firebase from "firebase";
import { useDebounce } from "use-debounce";
import { useAuthState } from "react-firebase-hooks/auth";
import { useDocumentDataOnce } from "react-firebase-hooks/firestore";

import Alert from 'react-bootstrap/Alert'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams
} from "react-router-dom";


import {PermissionsError} from '../../components/general/PermissionsError.js'


import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Button from "react-bootstrap/Button";
import { faBookOpen, faPen, faCheck} from '@fortawesome/free-solid-svg-icons'
import Logo from "../../components/general/Logo.js";

import "./course.css"

import {getDisplayName} from '../../minions/userHelper.js'

import { Loading } from '../../components/general/Loading';

import {CourseWithData} from './Course.js'

import history from '../../history';
import {NotSigned} from './NotSigned.js'




export const Course = ({}: {}) => {

  document.title = "Code in Place";

  // alert(qId)
  // User = the user's profile from state (we need this for email)
  const [user] = useAuthState(firebase.auth());


  const [userData, userLoading] = useDocumentDataOnce(firebase
    .firestore()
    .collection("users")
    .doc(`${user.email}`));

  if (userLoading) {
    return <Loading />;
  }

  const isSL = Boolean((userData != undefined) && userData['role'] == 'sectionLeader');
  const isStudent = Boolean((userData != undefined) && userData['role'] == 'admittedStudent');


  if(isStudent) {
    if(!userData['confirmedStudentAccept']) {
      return <NotSigned />
    }
  }

  if(!isSL && !isStudent) {
      return <PermissionsError msg="This page is only visible to section leaders"/>
  }


  return <CourseWithData
    isSL={isSL}
    user={user}
    userName={getDisplayName(user, userData)}
    userData={userData}
    submitFeedback = {submitFeedback}
  />

};

const submitFeedback = function(user, responses, responseKey) {
    firebase
      .firestore()
      .collection(`users`)
      .doc(`${user.email}`)
      .set(
        {'sectionFeedback':{
          [responseKey]:responses
        }},
        // Merge true => don't delete other fields in this object
        { merge: true }
      ).then( () => {
         //nothing to do
       }
      );
  }


