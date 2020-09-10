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


import {PermissionsError} from '../../../components/general/PermissionsError.js'


import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Button from "react-bootstrap/Button";
import { faBookOpen, faPen, faCheck} from '@fortawesome/free-solid-svg-icons'
import Logo from "../../../components/general/Logo.js";

import "../course.css"

import { Loading } from '../../../components/general/Loading';

import history from '../../../history';

import {getDisplayName} from '../../../minions/userHelper.js'
import {getSectionDateTimeStr} from '../../../minions/userHelper.js'
import {ExampleWithData} from './Example.js'
import {CourseNav} from '../CourseNav'


export const Example = ({}: {}) => {

  document.title = "Worked Example";

  // User = the user's profile from state (we need this for email)
  const [user] = useAuthState(firebase.auth());

  let { exampleId } = useParams();

  const [userData, userLoading] = useDocumentDataOnce(firebase
    .firestore()
    .collection("users")
    .doc(`${user.email}`));

  if (userLoading) {
    return <CourseNav userName={'loading...'}/>;
  }

  const isSL = Boolean((userData != undefined) && userData['role'] == 'sectionLeader');
  const isStudent = Boolean((userData != undefined) && userData['role'] == 'admittedStudent');

  if(!isSL && !isStudent) {
      return <PermissionsError msg="This page is only visible to section leaders and students"/>
  }


  return <ExampleWithData
    isSL={isSL}
    exampleId = {exampleId}
    user={user}
    userName={getDisplayName(user, userData)}
    userData = {userData}
  />

};