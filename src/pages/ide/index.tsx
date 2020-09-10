import React, { useState, useEffect, Component } from "react";
import firebase from "firebase";
import { useDebounce } from "use-debounce";
import { useAuthState } from "react-firebase-hooks/auth";
import { useDocumentDataOnce } from "react-firebase-hooks/firestore";
import { QWarmup} from './QWarmup.js'
import { QArches} from './QArches.js'
import { QHouse} from './QHouse.js'
import { QLeaves} from './QLeaves.js'
import { QFrame} from './QFrame.js'
import {QPiles} from './QPiles.js'
import {QHospital} from './QHospital.js'
import {QMidpoint} from './QMidpoint.js'
import {QTripple} from './QTripple.js'
import IdeNav from './IdeNav.js'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams
} from "react-router-dom";
import {checkVisualImparement} from '../../minions/userHelper.js'


const QUESTIONS = [QWarmup, QArches, QHouse, QLeaves, QFrame, QPiles, QHospital, QMidpoint, QTripple]


export const Ide = ({}: {}) => {

  let { assnId } = useParams();

  // alert(qId)
  // User = the user's profile from state (we need this for email)
  const [user] = useAuthState(firebase.auth());

  // useDocumentDataOnce says "get the document at this path once (dont update it if server data updates)"
  // serverData = the current document from the database (undefined if still loading)
  const [serverData, loading] = useDocumentDataOnce(firebase
    .firestore()
    .collection("users")
    .doc(`${user.email}/${assnId}/answers`));

  const [isSolved, solvedLoading] = useDocumentDataOnce(firebase
    .firestore()
    .collection("users")
    .doc(`${user.email}/${assnId}/solved`));

  const [aboutData, aboutLoading] = useDocumentDataOnce(firebase
    .firestore()
    .collection("users")
    .doc(`${user.email}`));

  if (loading || solvedLoading || aboutLoading) {
    return (
      <div className="d-flex flex-column" style={{height:'100vh'}}>
        <IdeNav />
      </div>
    )
  }

  const aboutDataFilled = Boolean((aboutData != undefined) && aboutData['about']);
  const hasVisualImpairment = checkVisualImparement(aboutDataFilled, aboutData)


  return <IdeWithData serverData={serverData} email={user.email} isSolvedInput={isSolved} makeAccessible={hasVisualImpairment}/>

};

const injectStarterCode = function(code) {
  // note, this injects starter code into all projects with blank solutions
  if(!code) {
    code = {}
  }
  for(var index in QUESTIONS) {
    var question = QUESTIONS[index]
    var qId = question.getKey()
    if(!(qId in code) || !code[qId]) {
      let starterCode = question.starterCode()
      code[qId]=starterCode;
    }
  }
  return code
}


// allows us to lookup a question component by its key
const buildComponentMap = function() {
  let componentMap = {}
  for(var index in QUESTIONS) {
    var question = QUESTIONS[index]
    var qId = question.getKey()
    componentMap[qId] = question
  }
  return componentMap
}

const IdeWithData = ({serverData, email,isSolvedInput, makeAccessible  }: {email: string, serverData: any,isSolvedInput:any, makeAccessible: boolean}) => {
  // inputData = the current `answers` object as the user types (i.e. {q1: 'xx', q2: 'xx'})
  // setInputData is a function to set new value of inputData
  // inputData is the users solution to the exercieses

  serverData = injectStarterCode(serverData)

  const [inputData, setInputData] = useState(serverData)

  const [isSolvedData, setIsSolvedData] = useState(isSolvedInput)


  // debouncedInputData is a lagged version of inputData (by 1 second). When it changes, we'll update the database
  const [debouncedInputData] = useDebounce(inputData, 1000);

  let { qId, assnId } = useParams();

  // Whenever our debouncedInputData changes, we need to update the database
  useEffect(() => {
    if(debouncedInputData) {
      firebase
      .firestore()
      .collection("users")
      .doc(`${email}/${assnId}/answers`).set(
          debouncedInputData,
          // Merge true => don't delete other fields in this object if they're not in debouncedData
          { merge: true }
        );
      }
  }, [debouncedInputData, email]);

  useEffect(() => {
    if(!isSolvedData || isSolvedData[qId] == undefined) return
    firebase
      .firestore()
      .collection("users")
      .doc(`${email}/${assnId}/solved`).set(
        {[qId]:isSolvedData[qId]},
        // Merge true => don't delete other fields in this object
        { merge: true }
      );
  }, [isSolvedData, email]);



  const data = inputData ? inputData[qId] : '';
  // TODO: this variable will be undefined, not false when a new quesiton is started.
  // there's a bunch of stuff weird about this. the isSolvedData is just a set. if there is a key in it, it maps to true
  const questionIsSolved = isSolvedData ? isSolvedData[qId] : false

  const componentMap = buildComponentMap()

  // make sure the qId actually matches a component
  if(!(qId in componentMap)) {
    return <p>Invalid question id</p>
  }

  let QComponent = componentMap[qId]
  return (
    <QComponent
        qId = {qId}
        data={data}
        setData={(newData) => { setInputData({...inputData, [qId]: newData})}}
        setSolved ={() => {setIsSolvedData({...isSolvedData, [qId]: true})}}
        isSolved = {questionIsSolved}
        makeAccessible={makeAccessible}
    />
  )

}

