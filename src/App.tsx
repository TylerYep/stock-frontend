import React, { useState, useEffect } from 'react';
import {
  FirebaseAuthProvider,
} from "@react-firebase/auth";
import "firebase/analytics";
import firebase from "firebase";
import { firebaseConfig } from "./firebase/config";
import "bootstrap/dist/css/bootstrap.min.css";
import { FirestoreProvider } from "@react-firebase/firestore";
import { Router } from "./Router";


function App() {
    useEffect(() => {
       document.title = "Code in Place Application";
       firebase.analytics(); // Initialize analytics
    }, []);

    return (
    <FirebaseAuthProvider firebase={firebase} {...firebaseConfig}>
      <FirestoreProvider { ...firebaseConfig} firebase={firebase}>
        <Router />
      </FirestoreProvider>
    </FirebaseAuthProvider>
    );
}

export default App;
