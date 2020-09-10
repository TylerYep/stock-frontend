import React from "react";
import { Button } from "react-bootstrap";
import firebase from "firebase";
import { QuestionContainer } from "./QuestionContainer";

export const TestPage = () => {
  return (
    <>
      <h1>This user is authenticated!</h1>
      <Button onClick={() => firebase.auth().signOut()}>Signout</Button>
      <br />
      <QuestionContainer assignment="assign0" />
    </>
  );
};
