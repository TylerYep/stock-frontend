import React, { useState } from "react";
import OnboardForm from './OnboardForm';
import { SlJoinNav } from "../SlJoinNav";
import { Card } from "react-bootstrap";

import firebase from "firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useDocumentDataOnce, useCollectionDataOnce } from "react-firebase-hooks/firestore";
import { Loading } from '../../../components/general/Loading';
import SweetAlert from 'sweetalert2-react';
import { Redirect } from 'react-router-dom';


import {PermissionsError} from '../../../components/general/PermissionsError.js'

export const SLSectionTimePage = ({}: {}) => {
  document.title = "Section Time";

  const [user] = useAuthState(firebase.auth());

  // keeps track of successful submit sweet alert
  const [submitAlert, setSubmitAlert] = useState(false);
  const [formSubmitted, setFormSubmiited] = useState(false);
  const [userTimezone, setUserTimezone] = useState("UTC-07:00");
  const [userSection, setUserSection] = useState({});
  const [timezoneLoaded, setTimezoneLoaded] = useState(false);
  const [userSectionLoaded, setUserSectionLoaded] = useState(false);

  const [serverData, loading] = useDocumentDataOnce(firebase
    .firestore()
    .collection("users")
    .doc(`${user.email}`));

  // debugger
  if (loading) {
    return <Loading />;
  }

  return <PermissionsError msg="Changing section times is turned off! We have used the time you provided for section assignments"/>

  const isSL = Boolean((serverData != undefined) && serverData['role'] == 'sectionLeader');
  if(!isSL) {
    firebase.auth().signOut()
  }

  const slSectionTime = (serverData != undefined && serverData['slSectionTime']) ?
                  serverData['slSectionTime'] :
                  {}
  const timezoneData = (serverData != undefined && serverData['userTimezone']) ?
    serverData['userTimezone'] : "UTC-07:00";

  if (!timezoneLoaded) {
    setUserTimezone(timezoneData);
    setTimezoneLoaded(true);
  }

  if(!userSectionLoaded) {
    setUserSection(slSectionTime)
    setUserSectionLoaded(true)
  }

  const submitForm = function(newValue) {
    setSubmitAlert(true);
  }

  const handleSectionChange = function(e) {
    const newSection = parseInt(e.target.value);
    const newSectionData = {
        sectionTime: newSection,
    }
    console.log(newSectionData)
     firebase
      .firestore()
      .collection(`users`)
      .doc(`${user.email}`)
      .set({slSectionTime:newSectionData},
        // Merge true => don't delete other fields in this object
        { merge: true }
      ).then(() => {
        setUserSection(newSectionData);
      });
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
          <SlJoinNav />
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
                    slAboutData={{...userSection, userTimezone: userTimezone}}
                    onSubmit={submitForm}
                    handleTimezoneChange={handleTimezoneChange}
                    handleSectionChange={handleSectionChange}
                  />
                <SweetAlert
                  show={submitAlert}
                  title="Success"
                  text="Your form has been successfully submitted!"
                  type="success"
                  onConfirm={() => {setSubmitAlert(false); setFormSubmiited(true);}}
                />
                {formSubmitted ? <Redirect to="/sl/splash" /> : <></>}
            </div>
          </Card>
        </div>
      </div>
  );

}
