console.log("Hello Work! From index.js with Firebase")

import { initializeApp } from "firebase/app";
import {
  getFirestore, collection, getDocs,
  addDoc
} from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyAfLcvj52n2D-m0g09tzNBuAeROJwXtRu0",
  authDomain: "williamson-surveying-tool.firebaseapp.com",
  databaseURL: "https://williamson-surveying-tool-default-rtdb.firebaseio.com",
  projectId: "williamson-surveying-tool",
  storageBucket: "williamson-surveying-tool.appspot.com",
  messagingSenderId: "860294126553",
  appId: "1:860294126553:web:470b32b4f0162c98fc57c8",
  measurementId: "G-CXJ9TJRR0Q"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);

// init services
const db = getFirestore()

// collection ref
const colRef = collection(db, 'responses')

// retrieve documents collection data
function retrieveDocsFromFirebase() {
  console.log("Documents retrieved")
  getDocs(colRef)
    .then((snapshot) => {
      console.log(snapshot.docs);

      let surveyarvid = []

      snapshot.docs.forEach((doc) => {
        surveyarvid.push(
          {
            ...doc.data(),
            id: doc.id
          }
        )
      })

      console.log(surveyarvid);
    })
    .catch(err => {
      console.log(err.message)
    })
}



// adding documents
// testing
document.getElementById("viewDocsBtn").onclick = retrieveDocsFromFirebase();

// this collects the data from the form with tag "add"
const addForm = document.querySelector(".add")

// add an event listener for when the button is pressed
addForm.addEventListener('submit', (e) => {
  e.preventDefault() // preventing default html action when a button is submitted which is refreshing

  addDoc(colRef, {
    user: addForm.user_id.valueAsNumber,
    x_value: addForm.x_value.valueAsNumber,
    y_value: addForm.y_value.valueAsNumber,
    circle_size: addForm.circle_size.valueAsNumber,
  })
    .then(() => {
      // returns a promise after it is complete
      addForm.reset() // reseting values in the form
      retrieveDocsFromFirebase()
    })
})

/*
 <label for="user-id">User id</label>
        <input type="text" name="user-id" required>
        <label for="x-value">x-value</label>
        <input type="number" name="x-value" required>
        <label for="y-value">y-value</label>
        <input type="number" name="y-value" required>
        <label for="circle-size">circle-size</label>
        <input type="number" name="circle-size" required>*/