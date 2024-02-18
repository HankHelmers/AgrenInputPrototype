console.log("Hello Work! From index.js with Firebase")

import { initializeApp } from "firebase/app";

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

