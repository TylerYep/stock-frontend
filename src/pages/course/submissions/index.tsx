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
  useParams,
  useLocation,
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
import {SubmissionsWithData} from './Submissions.js'
import {CourseNav} from '../CourseNav'


export const Submissions = ({}: {}) => {

  document.title = "Submissions";

  // User = the user's profile from state (we need this for email)
  const [user] = useAuthState(firebase.auth());
  const [userToken, setUserToken] = useState('');

  const query = new URLSearchParams(useLocation().search);


  let assnId;
  // Syntax to include IDE file upload:
  // https://compedu.stanford.edu/codeinplace/v1/#/submissions?include_ide_files=assn1
  if (query.get("include_ide_files")) {
    assnId = query.get("include_ide_files");
    window.history.replaceState(null, null, window.location.pathname + "#/submissions");
  }


  const [serverData, loading] = useDocumentDataOnce(firebase
      .firestore()
      .collection("users")
      .doc(`${user.email}/${assnId}/answers`));


  ///////////////////////////
  // Hard coded
  ///////////////////////////
  let codePostFiles;
  if (serverData) {
    if (serverData['tripple']) {
      codePostFiles = [
        {
        name: 'TripleKarel.py',
        data: serverData['tripple']
      },
      {
        name: 'StoneMasonKarel.py',
        data: serverData['arches']
      },
      {
        name: 'MidpointKarel.py',
        data: serverData['midpoint']
      }
      ]
    }
  }

  const codePostAssignmentId = assnId && codePostFiles ? 4050 : undefined;
  ///////////////////////////
  ///////////////////////////


  useEffect(() => {
    firebase.auth().currentUser.getIdToken()
      .then(function(idToken) {
        setUserToken(idToken);
      })
      .catch(function(error) {
        console.error(error);
      });
  }, []);


  const [userData, userLoading] = useDocumentDataOnce(firebase
    .firestore()
    .collection("users")
    .doc(`${user.email}`));

  if (userLoading || userToken === '' || loading) {
    return <CourseNav userName={'loading...'}/>;
  }

  const isSL = Boolean((userData != undefined) && userData['role'] == 'sectionLeader');
  const isStudent = Boolean((userData != undefined) && userData['role'] == 'admittedStudent');

  if(!isSL && !isStudent) {
      return <PermissionsError msg="This page is only visible to section leaders and students"/>
  }


  return <SubmissionsWithData
    isSL={isSL}
    user={user}
    userName={getDisplayName(user, userData)}
    userData={userData}
    userToken={userToken}
    codePostAssignmentId={codePostAssignmentId}
    codePostFiles={codePostFiles}

  />

};