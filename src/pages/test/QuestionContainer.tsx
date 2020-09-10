import React, { useState, useEffect, Component } from "react";
import firebase from "firebase";
import { useDebounce } from "use-debounce";
import { useAuthState } from "react-firebase-hooks/auth";
import { useDocumentDataOnce } from "react-firebase-hooks/firestore";

export const QuestionContainer = ({
  assignment,
}: {
  assignment: string;
}) => {
  // User = the user's profile from state (we need this for email)
  const [user] = useAuthState(firebase.auth());

  // useDocumentDataOnce says "get the document at this path once (dont update it if server data updates)"
  // serverData = the current document from the database (undefined if still loading)
  const [serverData, loading] = useDocumentDataOnce(firebase
    .firestore()
    .collection("users")
    .doc(`${user.email}/${assignment}/answers`));

  if (loading) {
    return <span>Loading</span>;
  }
  return <Questions serverData={serverData} assignment={assignment} email={user.email} />
};

const Questions = ({ assignment, serverData, email }: {assignment: string, email: string, serverData: any}) => {
  // inputData = the current `answers` object as the user types (i.e. {q1: 'xx', q2: 'xx'})
  // setInputData is a function to set new value of inputData
  const [inputData, setInputData] = useState(serverData);
  // debouncedInputData is a lagged version of inputData (by 1 second). When it changes, we'll update the database
  const [debouncedInputData] = useDebounce(inputData, 1000);

  // Whenever our debouncedInputData changes, we need to update the database
  useEffect(() => {
    if(debouncedInputData) {
      firebase
      .firestore()
      .collection("users")
      .doc(`${email}/${assignment}/answers`).set(
          debouncedInputData,
          // Merge true => don't delete other fields in this object if they're not in debouncedData
          { merge: true }
        );
      }
  }, [debouncedInputData, email, assignment]);
  
  const getQuestionInput = (questionId: string) => {
    const data = inputData ? inputData[questionId] : '';
    return <QuestionInput data={data} setData={(newData) => { setInputData({...inputData, [questionId]: newData})}}/>;
  }
  return (
    <>
      <h1>Q1</h1>
      {getQuestionInput('q1')}
      <h1>Q2</h1>
      {getQuestionInput('q2')}
    </>
  );
}

class QuestionInput extends Component <any,any> {
  render() {
    return <input value={this.props.data} onChange={e => this.props.setData(e.target.value)} />
  }
}

