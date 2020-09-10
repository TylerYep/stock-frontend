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



import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Button from "react-bootstrap/Button";
import { faBookOpen, faPen, faCheck} from '@fortawesome/free-solid-svg-icons'
import Logo from "../../components/general/Logo.js";
import {checkVisualImparement} from '../../minions/userHelper.js'
import "./splash.css"

import SplashNav from './SplashNav.js'
import { Loading } from '../../components/general/Loading';

import {getDisplayName} from '../../minions/userHelper.js'

import history from '../../history';

const ASSIGNMENT = 'assn0'
let READER_URL = 'https://compedu.stanford.edu/karel-reader/docs/python/en/intro.html'
const QUESTION_NAMES = [
  ['warmup', 'A. Warmup'],
  ['house', 'B. Shelter-in-Place'],
  ['piles', 'C. Piles'],
  // ['frame', 'D. Frame Karel'],
  // ['arches', 'E. Build Arch'],
  // ['leaves', 'F. Springtime'],
]

const BLIND_QUESTION_NAMES = [
  ['warmup', 'A. Warmup'],
  ['piles', 'B. Piles'],
  // ['frame', 'D. Frame Karel'],
  // ['arches', 'E. Build Arch'],
  // ['leaves', 'F. Springtime'],
]

const BONUS_NAMES = [
  ['frame', 'Bonus: Frame Karel'],
]

// this is necessary to clear the query params (without it you
// get some strange bugs when trying to sign-out)
export const removeQuery = () => {
  history.push('#/splash');
};

const allDone = function(questionsDone, hasVisualImpairment=false) {
  if(!questionsDone) {
    return false
  }
  if(!questionsDone['warmup']) {
    return false
  }
  if(!questionsDone['piles']) {
    return false
  }
  if(!hasVisualImpairment && !questionsDone['house']) {
    return false
  }
  return true
}

export const Splash = ({}: {}) => {

  document.title = "Code in Place Application";
  removeQuery()

  // alert(qId)
  // User = the user's profile from state (we need this for email)
  const [user] = useAuthState(firebase.auth());

  const [isSolved, _solvedLoading] = useDocumentDataOnce(firebase
    .firestore()
    .collection("users")
    .doc(`${user.email}/${ASSIGNMENT}/solved`));

  const [serverAboutData, _aboutLoading] = useDocumentDataOnce(firebase
    .firestore()
    .collection("users")
    .doc(`${user.email}`));

  if (_solvedLoading || _aboutLoading) {
    return <Loading />;
  }

  const aboutDataFilled = Boolean((serverAboutData != undefined) && serverAboutData['about'])

  return <SplashWithData aboutData={serverAboutData} aboutDone={aboutDataFilled} questionsDone={isSolved} user={user}/>

};


const SplashWithData = ({user, aboutData, aboutDone, questionsDone}: any) => {
  let userGreetingStr = getDisplayName(user, aboutData)

  const hasVisualImpairment = checkVisualImparement(aboutDone, aboutData)

  const questionNames = hasVisualImpairment ? BLIND_QUESTION_NAMES : QUESTION_NAMES;
  return (
<div>
   {/*
   <div className="container container-narrow">
      <SplashNav />
   </div>
   */}
   <div className="container container-narrow mt-5">
      <div className="row" id="indexHead">
         <div className="col-sm-12">
            <div id="logo">
               <img id="logoImg" src={process.env.PUBLIC_URL + '/stanford.png'} alt="Stanford Logo"></img>
            </div>
            <div id="headerText" style={{paddingBottom:"15px"}}>
               <div id="title">
                  [Closed] Code in Place App
               </div>
               <div>
                  Due midnight April 8th, 2020 Anywhere on Earth
               </div>
            </div>
         </div>
      </div>
      <div className="row">
         <div className ="col mt-4">
            <div className = "d-flex justify-content-between w-100 mb-2">
               <h4 className ="mt-2">Hello and welcome {userGreetingStr},</h4>
               <Button className="ml-2" variant="outline-secondary" onClick={() => firebase.auth().signOut()}>Signout</Button>
            </div>

             <div className="alert alert-danger" role="alert">
               <b>Enrollment closed:</b> We are no longer processing new submissions. If you finished before April 8th, we have your submission and will get back to you in the next few days. Feel free to keep programming here! We just won't look at any work done after this point.
            </div>
            <p>
               The time of COVID-19 has been difficult for many people around the world, in many different ways. As an act of community service, a group of computer science instructors is coming together to offer our teaching services free of charge for people who want to learn introductory coding.
               &nbsp;<a target="_blank" href="https://compedu.stanford.edu/codeinplace/announcement">About the course</a>.
            </p>
            <p>
               To apply, please finish the tasks below by April 8th. We will review all completed applications by April 10th.
            </p>
            <div className="alert alert-primary" role="alert">
               <b>For beginners:</b> We don’t expect you to have any coding knowledge before taking this course! We expect the exercises to be a little tricky - but you can do it - check out the FAQs if you get stuck!
            </div>

            {/*<ApplicationStatus questionsDone={questionsDone} aboutDone={aboutDone} hasVisualImpairment={hasVisualImpairment}/>*/}

           

            <div className="alert alert-warning" role="alert">
               <b>Not enrolled yet:</b> We want to offer this exerpience to everyone, but our number of spaces may be limited by how many high-quality volunteer teachers we get. We will review every single application that was completed by April 8th, 2020.

            </div>

            <hr/>
         </div>
      </div>
   </div>
   <div className="container">
    <div className="row">
      <div className="col">
       <div className="d-flex justify-content-center w-100">
          <div className="card mb-3 " style={{width: "540px"}}>
            <div className="row no-gutters">
               <div className="col-md-12">
                  <div className="card-body">
                     <h4 className="mb-3">1. Tell us about yourself</h4>
                     <a href="#/aboutme">
                        <h4 className="">
                           <FontAwesomeIcon icon={faPen} className="mr-2"/>
                           Fill out this form {aboutDone ? <FontAwesomeIcon icon={faCheck} className="ml-2 text-success"/> : ""}
                        </h4>
                     </a>
                  </div>
               </div>
            </div>
          </div>
       </div>
        <div className="d-flex justify-content-center w-100">
            <div className="card mb-3 " style={{width: "540px"}}>
               <div className="row no-gutters">
                  <div className="col-md-12">
                      <div className="card-body">
                         <h4 className="mb-3">2. Learn Karel basics</h4>
                         <a target="_blank" href={READER_URL}>
                            <h4 className="">
                               <FontAwesomeIcon icon={faBookOpen} className="mr-2"/>
                               Read chapters 1 through 5 {(questionsDone ? questionsDone['warmup'] :false) ? <FontAwesomeIcon icon={faCheck} className="ml-2 text-success"/> : ""}
                            </h4>
                         </a>
                      </div>
                  </div>
               </div>
            </div>
       </div>
       <div className="d-flex justify-content-center w-100">
          <div className="card mb-3" style={{width: "540px"}}>
            <div className="row no-gutters">
               <div className="col-md-12">
                  <div className="card-body">
                     <h4 className="mb-3">3. Do a few exercises:</h4>

                       {questionNames.map(([qId, name]) =>
                        <h4 className="mb-3">
                           <QTask qId={qId} name={name} solved={questionsDone ? questionsDone[qId] :false}/>
                        </h4>
                       )}
                  </div>
               </div>
            </div>
          </div>
       </div>
       {
        allDone(questionsDone, hasVisualImpairment) && (

          <div className="d-flex justify-content-center w-100">
            <div className="card mb-3" style={{width: "540px"}}>
              <div className="row no-gutters">
                 <div className="col-md-12">
                    <div className="card-body">
                       <h4 className="mb-3">Just for fun! If you want more Karel:</h4>

                         {BONUS_NAMES.map(([qId, name]) =>
                          <h4 className="mb-3">
                             <QTask qId={qId} name={name} solved={questionsDone ? questionsDone[qId] :false}/>
                          </h4>
                         )}
                    </div>
                 </div>
              </div>
            </div>
         </div>

        )
       }

               <hr/>
               <div className="footer">
                  <p className="pull-left">
                    © Stanford 2020 | Website created as a collaborative effort by the code in place teaching team. We are in this as a community-service project to educate folks. We dont sell data. See our <a href="https://compedu.stanford.edu/codeinplace/handouts/privacyPolicy.html">privacy policy</a>
                  </p>
                </div>
      </div>
      </div>
   </div>
</div>
  )
}


const ApplicationStatus = ({questionsDone, aboutDone, hasVisualImpairment}) => {
  if(!aboutDone) {
    return <ApplicationMissingAbout />
  }
  var isAbcDone = allDone(questionsDone, hasVisualImpairment)
  if(!isAbcDone) {
    return <ApplicationMissingExercises hasVisualImpairment={hasVisualImpairment}/>
  }
  return (
    <div className="alert alert-success" role="alert">
       <b>Application complete!</b> You finished your application and your work is in our database!
       We have unlocked some more puzzles -- only do them if you want to! We will let you know if we have space for you on April 10th. For now you should feel proud of yourself for writing some first programs. Rock on!
    </div>
  )
}

const ApplicationMissingExercises = ({hasVisualImpairment}) => {
  return (
    <div className="alert alert-info" role="alert">
       <b>Status:</b> Not submitted yet. Finish all {hasVisualImpairment ? "two" : "three"}  exercises to submit.
    </div>
  )
}

const ApplicationMissingAbout = () => {
  return (
    <div className="alert alert-info" role="alert">
       <b>Status:</b> Not submitted yet. Fill in the "tell us about yourself" form.
    </div>
  )
}

const ApplicationDone = () => {
  return (
    <div className="alert alert-success" role="alert">
       <b>Congrats!</b> You finished your application and your work is in our database!
    </div>
  )
}

const QTask = ({qId, name, solved}) => {
  return <a href={`#/exercises/${qId}`}><h4 className="mb-3">{name} {solved? <FontAwesomeIcon icon={faCheck} className="ml-2 text-success"/> : ""}</h4></a>
}
