import React, { useState, useEffect, Component } from "react";
import firebase from "firebase";
import { useDebounce } from "use-debounce";
import { useAuthState } from "react-firebase-hooks/auth";
import { useDocumentDataOnce } from "react-firebase-hooks/firestore";
import { Loading } from '../../components/general/Loading';

import Alert from 'react-bootstrap/Alert'
import Button from "react-bootstrap/Button";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBookOpen, faPen, faScroll, faClock, faCheck, faUser} from '@fortawesome/free-solid-svg-icons'
import {getDisplayName} from '../../minions/userHelper.js'

import history from '../../history';
import "./slSplash.css"
import Swal from 'sweetalert2'

import {Link} from "react-router-dom"

import {PermissionsError} from '../../components/general/PermissionsError.js'

class Blank extends Component {
  render(){return <h1>404</h1>}
}

export const StudentAdmitSplash = ({}: {}) => {
  document.title = "Admitted Student";

  const [user, _loading] = useAuthState(firebase.auth());


  const [serverData, _aboutLoading] = useDocumentDataOnce(firebase
    .firestore()
    .collection("users")
    .doc(`${user.email}`));

  if (_loading || _aboutLoading) {
    return <Loading />;
  }

  const isSL = Boolean((serverData != undefined) && serverData['role'] == 'sectionLeader');
  const isAccepted = Boolean((serverData != undefined) && serverData['role'] == 'admittedStudent');



  if(!isAccepted && !isSL) {
    console.log(`Attempted to login with an unaccepteed non-SL email acccount: ${user.email}`);

    return <PermissionsError msg="This page is only visible to students who were accepted."/>
  }

  const stepsCompleted = {
    committmentDone: Boolean(serverData != undefined && serverData['studentCommitment']),
    sectionTimeDone: Boolean(serverData != undefined && serverData['sectionTimePrefs']) ,
  }


  const hasDeclined = (serverData != undefined && serverData['confirmedStudentAccept'] === false);   // TODO: replace stub
  const confirmedAccept = (serverData != undefined && serverData['confirmedStudentAccept'] === true);   // TODO: replace stub

  if(hasDeclined) {
    return <DeclinePage />
  } else {
    return <SplashWithData serverData={serverData} user={user} confirmedAccept={confirmedAccept} stepsCompleted={stepsCompleted}/>
  }
};

const DeclinePage = ({}: {}) => {
  return <PermissionsError msg="You have already declined the offer."/>
}

const renderDeclineBtn = function(declineAcceptance) {
  return <Button className="ml-2" onClick={(u) => declineAcceptance(u)} variant="outline-dark" size="lg">Decline Offer</Button>
}

const getFinishBtnText = function(confirmedAccept) {
  if(confirmedAccept) {
    return 'Enter Course'
  } else {
    return 'Join Course'
  }
}

const getFinishBtnInfo = function(confirmedAccept) {
  if(confirmedAccept) {
    return 'Welcome back:'
  } else {
    return 'When you click this button, you commit to being a student of this class:'
  }
}

const declineAcceptance = function(user) {

    Swal.fire({
      title: 'Declining Offer',
      text:"Are you sure? This cannot be undone.",
      confirmButtonText: "Decline Offer",
      icon: 'error',
      showCancelButton: true
    }).then( (result) => {
      console.log(result);
       if(result.value) {
        firebase
          .firestore()
          .collection(`users`)
          .doc(`${user.email}`)
          .set({confirmedStudentAccept: false},
            // Merge true => don't delete other fields in this object
            { merge: true }
          ).then(() => {
            // @ts-ignore
            firebase.auth().signOut()
          });
        }
    })


  }

const confirmAcceptance = function(user) {
    Swal.fire({
      title: 'Welcome',
      text:"You're now officially enrolled in Code in Place",
      confirmButtonText: "Yay",
      icon: 'success',
    }).then( (result) => {
     firebase
      .firestore()
      .collection(`users`)
      .doc(`${user.email}`)
      .set({
          confirmedStudentAccept:true,
          dateJoined:new Date()
        },
        // Merge true => don't delete other fields in this object
        { merge: true }
      ).then(() => {
        // @ts-ignore
        window.location ='#/course'
      });
    })
  }



const SplashWithData = ({serverData, user, confirmedAccept, stepsCompleted}:
                        {serverData: any, user:any, confirmedAccept: boolean, stepsCompleted: Record<string, boolean>}) => {

    const userGreetingStr = getDisplayName(user, serverData);
    const buttonDisabled = !Object.keys(stepsCompleted).every((k) => {return stepsCompleted[k] === true});
    return (
      <div>
       <WelcomeAnnouncement name={userGreetingStr} stepsCompleted={stepsCompleted}/>

        <div className="container container-narrow">

          <TodoStep text="Committing to the class" successCond={stepsCompleted['committmentDone']} icon={faScroll} href="/admitted/committing"/>
          <TodoStep text="Section time preferences" successCond={stepsCompleted['sectionTimeDone']} icon={faClock} href="/admitted/sectiontime"/>

          <div className="d-flex align-items-center flex-column mt-4 mb-5">
            <p className="text-secondary">{getFinishBtnInfo(confirmedAccept)}</p>
            <div className="d-flex">
              <Button onClick={() => confirmAcceptance(user)}size="lg" disabled={buttonDisabled}>{getFinishBtnText(confirmedAccept)}</Button>

             {  !confirmedAccept ?
               renderDeclineBtn(() => declineAcceptance(user))
               : null}

            </div>
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


const WelcomeAnnouncement = ({name, stepsCompleted}:
                             {name:string, stepsCompleted: Record<string, boolean>}) => {
      return (
       <div className="container container-narrow mt-5">
          <div className="row">
             <div className ="col mt-4 ">
                <div className = "d-flex flex-column align-items-center w-100 mb-4">
                   <h1 className="mb-3" style={{margin: "auto"}}>Congratulations {name}!</h1>
                   <h3 style={{margin: "auto"}}>Please join us as a student of Code in Place</h3>
                </div>
                <p>
                   We would love to have you as a member of Code in Place! We received close to 80,000 student applications and after some careful review, we think you would
                   make an incredible edition to the course. This is a formal invitation to join as a student.
                </p>

                <p>
                    As you already know, this community-service project is one of a kind. We have perhaps the largest and most diverse teaching team ever assembled for a single course:
                    you are going to be taught by a group which includes everything from professors and ceos to rockstar freshmen from 65 different countries. Your peers are also from diverse
                    and exciting backgrounds, united by the desire to learn this beautiful subject of Computer Science.
                </p>
                <p>
                   You can't continue in the course until you finish this task! 
                </p>

                <ApplicationStatus stepsCompleted={stepsCompleted}/>
                <hr/>
                <p className="subtleHeading mb-4">
                  Estimated effort: 5 mins.
                </p>
             </div>
          </div>
       </div>
     )
 }

const ApplicationStatus = ({stepsCompleted}: { stepsCompleted: Record<string, boolean>}) => {

  if(!stepsCompleted['committmentDone']){
    return <ApplicationStepMissing msg="Please commit to taking the class."/>
  }

  if(!stepsCompleted['sectionTimeDone']){
    return <ApplicationStepMissing msg="Please select your section time preferences."/>
  }


  return (
    <div className="alert alert-success" role="alert">
       <b>Application complete!</b> You finished your application and your work is in our database! Next step: come join the Ed group to become a part of our
       amazing community of students. Rock on!
    </div>
  )
}


const ApplicationStepMissing = ({msg}: {msg:string}) => {
  return (
    <div className="alert alert-info" role="alert">
       <b>Status:</b> Not submitted yet. {msg}
    </div>
  )
}

