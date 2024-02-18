console.log("Entry from point between javascript files");


import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
  onSnapshot,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAfLcvj52n2D-m0g09tzNBuAeROJwXtRu0",
  authDomain: "williamson-surveying-tool.firebaseapp.com",
  databaseURL: "https://williamson-surveying-tool-default-rtdb.firebaseio.com",
  projectId: "williamson-surveying-tool",
  storageBucket: "williamson-surveying-tool.appspot.com",
  messagingSenderId: "860294126553",
  appId: "1:860294126553:web:470b32b4f0162c98fc57c8",
  measurementId: "G-CXJ9TJRR0Q",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// init services
const db = getFirestore();

// collection ref
const colRef = collection(db, "responses");

// retrieve documents collection data
onSnapshot(colRef, (snapshot) => {
  let surveyarvid = [];

  snapshot.docs.forEach((doc) => {
    surveyarvid.push({
      ...doc.data(),
      id: doc.id,
    });
  });

  console.log(surveyarvid);
});

// adding documents
// this collects the data from the form with tag "add"
const addForm = document.querySelector(".add");

// add an event listener for when the button is pressed
addForm.addEventListener("submit", (e) => {
  e.preventDefault(); // preventing default html action when a button is submitted which is refreshing

  addDoc(colRef, {
    user: addForm.user_id.valueAsNumber,
    x_value: addForm.x_value.valueAsNumber,
    y_value: addForm.y_value.valueAsNumber,
    circle_size: addForm.circle_size.valueAsNumber,
  }).then(() => {
    // returns a promise after it is complete
    addForm.reset(); // reseting values in the form
  });

});


////////// ChartJS

const data = {
  //labels: ['Twelve Problems'],
  //abels: ['January', 'February', 'March', 'April'],
  datasets: [{
        type: 'bar',
        label: 'Bar Dataset',
        data: [0, 0, 0, 0]
    }, 
    {
        type: 'scatter',
        label: 'Syntax Difficulty',
        data: [4.5, 3, 2, 1],
    },
    {
        type: 'scatter',
        label: 'Conceptual Difficulty',
        data: [2, 3, 4, 4.5],
    },
],
};

// config 
const config = {
    data,
    options: {
        scales: {
            x: {
                //type: 'linear',
            },
            y: {
                max:5,
                ticks: {
                    stepSize: 1,
                }
            }
        },

        plugins: {
            legend: {
                labels: {
                    usePointStyle: true,
                }
            }
        }
  }
};

// render init block
const myChart = new Chart(
  document.getElementById('myChart'),
  config
);

function updateChart(barvalue) {
    console.log(barvalue.value)
    myChart.config.data.datasets[0].data[0] = barvalue.value;
    myChart.update();
}
