import React, { useState } from "react";
import OnboardForm from './OnboardForm';
import { StudentAdmitNav } from "../StudentAdmitNav";
import { Card } from "react-bootstrap";

import firebase from "firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useDocumentDataOnce, useCollectionDataOnce } from "react-firebase-hooks/firestore";
import { Loading } from '../../../components/general/Loading';
import SweetAlert from 'sweetalert2-react';
import { Redirect } from 'react-router-dom';
import {PermissionsError} from '../../../components/general/PermissionsError.js'

export const StudentSectionPref = ({}: {}) => {
  document.title = "Section Time";

  const [user, _loading] = useAuthState(firebase.auth());

  // keeps track of successful submit sweet alert
  const [submitAlert, setSubmitAlert] = useState(false);
  const [formSubmitted, setFormSubmiited] = useState(false);

  const [userTimezone, setUserTimezone] = useState("UTC-07:00");
  const [timezoneLoaded, setTimezoneLoaded] = useState(false);

  const [serverData, loading] = useDocumentDataOnce(firebase
    .firestore()
    .collection("users")
    .doc(`${user.email}`));

  // debugger
  if (loading || _loading) {
    return <Loading />;
  }

  const isSL = Boolean((serverData != undefined) && serverData['role'] == 'sectionLeader');
  const isAccepted = Boolean((serverData != undefined) && serverData['role'] == 'admittedStudent');

  if(!isAccepted && !isSL) {
    console.log(`Attempted to login with an unaccepteed non-SL email acccount: ${user.email}`);

    return <PermissionsError msg="This page is only visible to students who were accepted."/>
  }


  const sectionTimePrefs = (serverData != undefined && serverData['sectionTimePrefs']) ?
                            serverData['sectionTimePrefs'] :
                            {}
  const timezoneData = (serverData != undefined && serverData['userTimezone']) ?
                        serverData['userTimezone'] : "UTC-07:00";


  if (!timezoneLoaded) {
    setUserTimezone(timezoneData);
    setTimezoneLoaded(true);
  }

  const savedData = {
    sectionTimePrefs: sectionTimePrefs,
    userTimezone: userTimezone
  }

  const submitForm = function(newValue) {
    setSubmitAlert(true);
  }

  const setStudentSectionAndTZ = function(newValue) {
    firebase
      .firestore()
      .collection(`users`)
      .doc(`${user.email}`)
      .set(
        {
          userTimezone: newValue['userTimezone'],
          sectionTimePrefs: newValue['sectionTimePrefs'],
        },
        // Merge true => don't delete other fields in this object
        { merge: true }
      ).then( () => {
          setSubmitAlert(true);
       }
      );

  }


  const handleTimezoneChange = function(e) {
    const newTimezone = e.target.value;

    firebase
      .firestore()
      .collection(`users`)
      .doc(`${user.email}`)
      .set(
        {userTimezone: newTimezone},
        { merge: true }
      ).then(() => {
        setUserTimezone(newTimezone);
      });
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
          <h1>Section Time</h1>
            <div>
              <OnboardForm
                    // slAboutData={{...userSection, userTimezone: userTimezone}}
                    savedData={savedData}
                    onSubmit={setStudentSectionAndTZ}
                    handleTimezoneChange={handleTimezoneChange}
                  />
                <SweetAlert
                  show={submitAlert}
                  title="Success"
                  text="Your form has been successfully submitted!"
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
