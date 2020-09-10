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

import {getDisplayName} from '../../../minions/userHelper.js'

export const SLCodeOfConductPage = ({}: {}) => {
  document.title = "Code of Conduct";

  const [user] = useAuthState(firebase.auth());

  // keeps track of successful submit sweet alert
  const [submitAlert, setSubmitAlert] = useState(false);
  const [formSubmitted, setFormSubmiited] = useState(false);

  const [serverData, loading] = useDocumentDataOnce(firebase
    .firestore()
    .collection("users")
    .doc(`${user.email}`));

  if (loading) {
    return <Loading />;
  }

  const isSL = Boolean((serverData != undefined) && serverData['role'] == 'sectionLeader');
  if(!isSL) {
    firebase.auth().signOut()
  }

  const slCodeOfConduct = (serverData != undefined && serverData['slCodeOfConduct']) ?
                  serverData['slCodeOfConduct'] :
                  {}

  const displayName = getDisplayName(user, serverData)

  const setSLCodeOfConduct = function(newValue) {
    firebase
      .firestore()
      .collection(`users`)
      .doc(`${user.email}`)
      .set(
        {slCodeOfConduct: newValue},
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

            <div>
              <OnboardForm
                displayName = {displayName}
                    slAboutData={slCodeOfConduct}
                    onSubmit={setSLCodeOfConduct}
                  />
                <SweetAlert
                  show={submitAlert}
                  title="Success"
                  text="Your response has been successfully submitted!"
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
