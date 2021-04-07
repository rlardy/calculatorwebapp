import React from 'react';
import './App.css';
import Calculator from "./components/Calculator";
import firebase from "firebase/app";
import Logs from "./components/Logs";
import firebaseConfig from "./firebaseConfig";

firebase.initializeApp(firebaseConfig);

function App() {
  return (
    <div className="App">
      <Calculator/>
        <Logs/>
    </div>
  );
}


export default App;
