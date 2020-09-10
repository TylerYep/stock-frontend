import React, { useState } from "react";
import OnboardForm from './OnboardForm'
import { SlJoinNav } from "../SlJoinNav";
import { Card } from "react-bootstrap";
import * as Timezones from "city-timezones";

import firebase from "firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useDocumentDataOnce, useCollectionDataOnce } from "react-firebase-hooks/firestore";
import { Loading } from '../../../components/general/Loading';
import SweetAlert from 'sweetalert2-react';
import { Redirect } from 'react-router-dom';

export const SLAboutFormPage = ({}: {}) => {
  document.title = "Onboarding";
  const [user] = useAuthState(firebase.auth());

  // keeps track of successful submit sweet alert
  const [submitAlert, setSubmitAlert] = useState(false);
  const [formSubmitted, setFormSubmiited] = useState(false);

  const [serverData, loading] = useDocumentDataOnce(firebase
    .firestore()
    .collection("users")
    .doc(`${user.email}`));

  // debugger
  if (loading) {
    return <Loading />;
  }

  const isSL = Boolean((serverData != undefined) && serverData['role'] == 'sectionLeader');
  if(!isSL) {
    firebase.auth().signOut()
  }

  const slAboutData = (serverData != undefined && serverData['sectionLeaderAbout']) ?
                  serverData['sectionLeaderAbout'] :
                  {}

  const setSLAboutData = function(newValue) {
    firebase
      .firestore()
      .collection(`users`)
      .doc(`${user.email}`)
      .set(
        {sectionLeaderAbout: newValue},
        // Merge true => don't delete other fields in this object
        { merge: true }
      ).then( () => {
          setSubmitAlert(true);
       }
      );
  }

  return (
      <div>
        <div className="container">
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
            <h1>What name should we show students?</h1>
            <div>
              <OnboardForm
                    slAboutData={slAboutData}
                    onSubmit={setSLAboutData}
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
