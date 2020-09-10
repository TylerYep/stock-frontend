import firebase from "firebase/app";
import "firebase/auth";
import React, { useState } from "react";
import Alert from 'react-bootstrap/Alert'
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup"
import FormControl from "react-bootstrap/FormControl"
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";


const FinalEmailLinkAuthStep = () => {
  //  TODO: save email entered in form below in local storage on so user doesn't
  //        have to enter email here when clicking the email link on same device
  const [email, setEmail] = useState("")
  const [errorMessage, setErrorMessage] = useState("")

  const loginUser = () => {
    firebase
      .auth()
      .signInWithEmailLink(email, window.location.href)
      .then( a => {} )
      .catch(function(error) {
        let message = error.message
        setErrorMessage(message)
      }) 
      /* TODO: handle errors like link has already been used and such */
  }
  return (
    <div className="d-flex flex-column align-items-center">
      <img
        src={process.env.PUBLIC_URL + "/stanford.png"}
        style={{ width: "300px" }}
        alt="Stanford Logo"
      />
      <h1>CS106A Code in Place</h1>
      <h3 style={{color:'grey'}}>Signup or Login</h3>
      <p>Version 1.2.1</p>
      <div>
        Please enter the email you used to register:<br/>

         <InputGroup className="mb-3">
         <FormControl onChange={e => {setEmail(e.target.value)}} aria-describedby="basic-addon1" />
          <InputGroup.Append>
            <Button onClick={loginUser} variant="primary">Verify</Button>
          </InputGroup.Append>
          
        </InputGroup>

      </div>
      {
        errorMessage ? <Alert variant={'danger'}>
      {errorMessage}
    </Alert> : <span></span>
      }
      
      <div style={{ maxWidth: "500px" }} className="text-center">
        <hr className="mt-5 mb-5" />

        <h5 style={{ textAlign: "center" }}>Don't have an account?</h5>
        <p>
          Click on one of the buttons above and it will make an account for you
        </p>
      </div>
    </div>
  )
}



export const Login = () => {

  //  handle a page loaded from an email sign in link
  if (
    firebase
      .auth()
      .isSignInWithEmailLink(
        window.location.href
      )
  ) {
    return <FinalEmailLinkAuthStep />
  }

  return (
    <div className="d-flex flex-column align-items-center">
      <img
        src={process.env.PUBLIC_URL + "/stanford.png"}
        style={{ width: "300px" }}
        alt="Stanford Logo"
      />
      <h1>CS106A Code in Place</h1>
      <h3 style={{color:'grey'}}>Signup or Login</h3>
      <p>Version 1.2.1</p>
      <StyledFirebaseAuth
        uiConfig={{
          signInOptions: [
            firebase.auth.GoogleAuthProvider.PROVIDER_ID,
            {
              provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
              signInMethod: firebase.auth.EmailAuthProvider.EMAIL_LINK_SIGN_IN_METHOD
            }
          ],
          signInFlow: 'popup',
        }}
        firebaseAuth={firebase.auth()}
      />
      <div style={{ maxWidth: "500px" }} className="text-center">
        <hr className="mt-5 mb-5" />

        <h5 style={{ textAlign: "center" }}>Don't have an account?</h5>
        <p>
          Click on one of the buttons above and it will make an account for you
        </p>
      </div>
    </div>
  );
};
