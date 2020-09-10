// @ts-ignore
import React, { useState, useEffect, Component } from "react";
import firebase from "firebase";
import { useDebounce } from "use-debounce";
import { useAuthState } from "react-firebase-hooks/auth";
import { useDocumentDataOnce } from "react-firebase-hooks/firestore";
import { Loading } from '../../components/general/Loading';

import Alert from 'react-bootstrap/Alert'
import Button from "react-bootstrap/Button";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBookOpen, faPen, faScroll, faClock, faCheck} from '@fortawesome/free-solid-svg-icons'
import {getDisplayName} from '../../minions/userHelper.js'

import history from '../../history';
import "./slSplash.css"

import {PermissionsError} from '../../components/general/PermissionsError.js'

import {Link} from "react-router-dom"

class Blank extends Component {
  render(){return <h1>404</h1>}
}

export const SLSplash = ({}: {}) => {
  document.title = "Section Leader Join";

  // alert(qId)
  // User = the user's profile from state (we need this for email)
  const [user, _loading] = useAuthState(firebase.auth());


  const [serverData, _aboutLoading] = useDocumentDataOnce(firebase
    .firestore()
    .collection("users")
    .doc(`${user.email}`));



  if (_loading || _aboutLoading) {
    return <Loading />;
  }

  const isSL = Boolean((serverData != undefined) && serverData['role'] == 'sectionLeader');
  if(!isSL) {
    console.log(`Attempted to login with an invalid SL email acccount: ${user.email}`);
    return <PermissionsError msg="This page is only visible to section leaders."/>
  }

  // TODO: enumerate steps here, link to backend
  const codeOfConductDone = Boolean((serverData != undefined) && serverData['slCodeOfConduct']);
  const sectionTimeDone = Boolean((serverData != undefined) && serverData['slSectionTime']);
  const confirmedSectionLeader = Boolean((serverData != undefined) && serverData['confirmedSectionLeader'])

  return <SplashWithData confirmedSectionLeader={confirmedSectionLeader} serverData={serverData} user={user} codeOfConductDone={codeOfConductDone} sectionTimeDone={sectionTimeDone}/>
};

const getFinishBtnText = function(confirmedSectionLeader) {
  if(confirmedSectionLeader) {
    return 'Enter Course'
  } else {
    return 'Generate My Section'
  }
}

const getFinishBtnInfo = function(confirmedSectionLeader) {
  if(confirmedSectionLeader) {
    return 'Welcome back:'
  } else {
    return 'When you click this button, you become a volunteer section leader:'
  }
}

const confirmSectionLeader = function(user) {
     firebase
      .firestore()
      .collection(`users`)
      .doc(`${user.email}`)
      .set({confirmedSectionLeader:true},
        // Merge true => don't delete other fields in this object
        { merge: true }
      ).then(() => {
        // @ts-ignore
        window.location ='#/course'
      });
  }


const SplashWithData = ({confirmedSectionLeader, serverData, user, codeOfConductDone, sectionTimeDone}:
                        {confirmedSectionLeader:boolean, serverData: any, user:any,codeOfConductDone: boolean, sectionTimeDone: boolean}) => {

    const userGreetingStr = getDisplayName(user, serverData);
    return (
      <div>
       <div className="container container-narrow mt-5">
          {/*<div className="row" id="indexHead">
             <div className="col-sm-12">
                <div id="logo">
                   <img id="logoImg" src={process.env.PUBLIC_URL + '/stanford.png'} alt="Stanford Logo"></img>
                </div>
                <div id="headerText" style={{paddingBottom:"15px"}}>
                   <div id="title">
                      Code in Place Secion Leaders
                   </div>
                   <div>
                      Welcome to the course!
                   </div>
                </div>
             </div>
          </div>
          <Button variant="outline-secondary" onClick={() => firebase.auth().signOut()}>Signout</Button>*/}

          <div className="row">
             <div className ="col mt-4 ">
                <div className = "d-flex flex-column align-items-center w-100 mb-4">
                   <h1 className="mb-3" style={{margin: "auto"}}>Congratulations {userGreetingStr}!</h1>
                   <h3 style={{margin: "auto"}}>Please join us as a section leader for Code in Place</h3>
                </div>
                <p>
                   We would love to teach with you. We reviewed close to one thousand section leader applications and yours was one of our favorites. We were impressed! This is a formal invitation to join as a section leader.</p>
                   <p> As you already know, this community-service project is one of a kind. We have perhaps the largest and most diverse teaching team ever assembled for a single course: you are part of a group which includes everything from professors and ceos to rockstar freshmen from 65 different countries. We also have many students who want to learn from us (as of writing this more than 20,000 students have completed the three exercises in assn0). This has the makings of a truly beautiful collaborative project which could do a lot for students and could teach us all a lot about methods for online learning.
                </p>
                <p>
                   Please finish the simple task below by <b>Thursday 11:59pm Anywhere on Earth</b> (so Thursday 5am in California). It is a tight deadline, but we need to know section leader numbers so we know how many students to accept.
                </p>



                <ApplicationStatus codeOfConductDone={codeOfConductDone} sectionTimeDone={sectionTimeDone}/>
                <hr/>
                <p className="subtleHeading mb-4">
                  Estimated effort: 5 mins.
                </p>
             </div>
          </div>
       </div>


        <div className="container container-narrow">

        {/*<TodoStep text="Double check your name" successCond={aboutDone} icon={faPen} href="/sl/aboutme"/>*/}
        <TodoStep text="Choose your section time" successCond={sectionTimeDone} icon={faClock} href="/sl/sectiontime"/>

        <TodoStep text="Agree to volunteer" successCond={codeOfConductDone} icon={faScroll} href="/sl/codeofconduct"/>


        <div className="d-flex align-items-center flex-column mt-4 mb-5">
        <p className="text-secondary">{getFinishBtnInfo(confirmedSectionLeader)}</p>
        <Button onClick={() => confirmSectionLeader(user)}size="lg" disabled={!codeOfConductDone || !sectionTimeDone}>{getFinishBtnText(confirmedSectionLeader)}</Button>
        </div>
        <hr/>

       </div>
   </div>

   )
}

const TodoStep = ({text, successCond, href, icon}:
                  {text: string, successCond: boolean, href: string, icon: any}) => {

    return (
         <div className="row">
          <div className="col">
           <div className="d-flex justify-content-center w-100">
              <div className="card mb-3 " style={{width: "540px"}}>
                <div className="row no-gutters">
                   <div className="col-md-12">
                      <div className="card-body">
                        <Link to={href}>
                            <h4 className="">
                               <FontAwesomeIcon icon={icon} className="mr-2"/>
                               {text}
                               {successCond ? <FontAwesomeIcon icon={faCheck} className="ml-2 text-success"/> : null}
                            </h4>
                         </Link>
                      </div>
                   </div>
                </div>
              </div>
           </div>
           </div>
         </div>
    )

}
const ApplicationStatus = ({codeOfConductDone, sectionTimeDone}: { codeOfConductDone: boolean, sectionTimeDone: boolean}) => {

  if(!sectionTimeDone) {
    return <ApplicationMissingSectionTime />
  }

  if(!codeOfConductDone) {
    return <ApplicationMissingCodeOfConduct />
  }


  return (
    <div className="alert alert-success" role="alert">
       <b>Application complete!</b> You finished your application and your work is in our database! Next step: come join the Ed group to become a part of our
       amazing community of teachers. Rock on!
    </div>
  )
}


const ApplicationMissingSectionTime = () => {
  return (
    <div className="alert alert-info" role="alert">
       <b>Status:</b> Not submitted yet. Please choose a section time.
    </div>
  )
}


const ApplicationMissingCodeOfConduct = () => {
  return (
    <div className="alert alert-info" role="alert">
       <b>Status:</b> Almost there. Please agree to volunteer.
    </div>
  )
}
