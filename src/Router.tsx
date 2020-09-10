import { useAuthState } from "react-firebase-hooks/auth";
import firebase from "firebase";
import React from "react";
import { Loading } from './components/general/Loading';
import { Login } from "./pages/login";
import { HashRouter } from "react-router-dom";
import { Switch, Route, Redirect } from "react-router";
import { TestPage } from "./pages/test";
import { Ide } from "./pages/ide";
import { JoinPage } from "./pages/join";
import { Reference } from "./pages/ide/Reference.js"
import { ComingSoon } from "./pages/comingSoon/ComingSoon.js"
import { Splash } from "./pages/splash"
import { SLSplash } from './pages/slSplash'
import { SLAboutFormPage } from './pages/slSplash/onboardform'
import { SLCodeOfConductPage } from './pages/slSplash/codeofconduct'
import { SLSectionTimePage } from './pages/slSplash/sectiontime'
import { Course } from './pages/course'
import { CourseSchedule } from './pages/course/schedule'
import { Handout } from './pages/course/handouts'
import { Example } from './pages/course/examples'
import { Reader } from './pages/course/pythonreader'

import { StudentAdmitSplash } from './pages/stdudentAdmitSplash'
import { StudentCommitment } from './pages/stdudentAdmitSplash/committing'
import { StudentSectionPref } from './pages/stdudentAdmitSplash/sectiontime'

import { Assn } from './pages/course/assignment'
import { Lectures } from './pages/course/lectures'
import { Submissions } from './pages/course/submissions'
import { PermissionsError } from './components/general/PermissionsError'


import history from './history';

export const Router = () => {
  const [user, loading] = useAuthState(firebase.auth());
  if (loading) {
    return <Loading />;
  }
  if (!user || !user.email) {
    return <Login />;
  }

  return (
    <HashRouter >
      <Switch>
        <Route path="/comingSoon"><ComingSoon /></Route>
        <Route path="/reference"><Reference /></Route>
        <Route path="/karel/:assnId/:qId"><Ide /></Route>
        <Route path="/splash"><Splash /></Route>
        <Route path="/aboutme"><JoinPage /></Route>

        <Route path="/sl/aboutme"><SLAboutFormPage /></Route>
        <Route path="/sl/codeofconduct"><SLCodeOfConductPage /></Route>
        <Route path="/sl/sectiontime"><SLSectionTimePage /></Route>
        <Route path="/sl"><SLSplash /></Route>


        <Route path="/admitted/committing"><StudentCommitment /></Route>
        <Route path="/admitted/sectiontime"><StudentSectionPref /></Route>
        <Route path="/admitted"><StudentAdmitSplash /></Route>

        {/*<Redirect from="/admitted" to="/course" />*/}

        <Route path="/course/schedule"><CourseSchedule /></Route>
        <Route path="/course"><Course /></Route>
        <Route path="/lectures"><Lectures /></Route>
        <Route path="/handout/:hId"><Handout /></Route>
        <Route path="/assignment/:assnId"><Assn /></Route>
        <Route path="/pythonreader/:extension"><Reader /></Route>
        <Route path="/example/:exampleId"><Example /></Route>

        <Route path="/submissions"><Submissions /></Route>

        <Redirect from="/" to="/course" />
      </Switch>
    </HashRouter>
  );
};
