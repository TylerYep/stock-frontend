import React, { useState } from "react";
import OnboardForm from './OnboardForm'
import { StudentAdmitNav } from "../StudentAdmitNav";
import { Card } from "react-bootstrap";
import * as Timezones from "city-timezones";

import firebase from "firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useDocumentDataOnce, useCollectionDataOnce } from "react-firebase-hooks/firestore";
import { Loading } from '../../../components/general/Loading';
import SweetAlert from 'sweetalert2-react';
import { Redirect } from 'react-router-dom';
import {PermissionsError} from '../../../components/general/PermissionsError.js'

import {getDisplayName} from '../../../minions/userHelper.js'

export const StudentCommitment = ({}: {}) => {
  document.title = "Commiting to the class";

  const [user, _loading] = useAuthState(firebase.auth());

  // keeps track of successful submit sweet alert
  const [submitAlert, setSubmitAlert] = useState(false);
  const [formSubmitted, setFormSubmiited] = useState(false);

  const [serverData, loading] = useDocumentDataOnce(firebase
    .firestore()
    .collection("users")
    .doc(`${user.email}`));

  if (_loading || loading) {
    return <Loading />;
  }


  const isSL = Boolean((serverData != undefined) && serverData['role'] == 'sectionLeader');
  const isAccepted = Boolean((serverData != undefined) && serverData['role'] == 'admittedStudent');

  if(!isAccepted && !isSL) {
    console.log(`Attempted to login with an unaccepteed non-SL email acccount: ${user.email}`);

    return <PermissionsError msg="This page is only visible to students who were accepted."/>
  }

  const studentCommitment = (serverData != undefined && serverData['studentCommitment']) ?
                  serverData['studentCommitment'] :
                  {}

  const displayName = getDisplayName(user, serverData)

  const setStudentCommitment = function(newValue) {
    firebase
      .firestore()
      .collection(`users`)
      .doc(`${user.email}`)
      .set(
        {studentCommitment: newValue},
        // Merge true => don't delete other fields in this object
        { merge: true }
      ).then( () => {
          setSubmitAlert(true);
       }
      );
  }

  return (
      <div>
        <div className="container container-narrow">
          <StudentAdmitNav />
        </div>
        <div
          style={{
            width: "720px",
            maxWidth: "90vw",
            margin: "auto",
            marginTop: "50px",
            marginBottom: "50px"
          }}
        >
          <Card style={{ margin: "auto", padding: "20px" }}>

            <div>
              <OnboardForm
                  displayName = {displayName}
                  slAboutData={studentCommitment}
                  onSubmit={setStudentCommitment}
              />
                <SweetAlert
                  show={submitAlert}
                  title="Success"
                  text="Your response has been successfully submitted!"
                  type="success"
                  onConfirm={() => {setSubmitAlert(false); setFormSubmiited(true);}}
                />
                {formSubmitted ? <Redirect to="/admitted" /> : <></>}
            </div>
          </Card>
        </div>
      </div>
  );

}
