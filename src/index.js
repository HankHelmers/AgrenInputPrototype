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

// // retrieve documents collection data
// onSnapshot(colRef, (snapshot) => {
//   let surveyarvid = [];

//   snapshot.docs.forEach((doc) => {
//     surveyarvid.push({
//       ...doc.data(),
//       id: doc.id,
//     });
//   });

//   //console.log(surveyarvid);
// });


////////// ChartJS
const mapOfEvolution = new Map();
mapOfEvolution.set(0, 'transposable_elments')
mapOfEvolution.set(1, 'female_meiotic_drive')
mapOfEvolution.set(2, 'cancer')
mapOfEvolution.set(3, 'cytoplasmic_elements2')
mapOfEvolution.set(4, 'genomic_imprinting')
mapOfEvolution.set(5, 'greenbeard_genes')
mapOfEvolution.set(6, 'non_selfish_elements')

// Holds whether a value as been paced on the map or not for each
// selection
// 0 - hasn't made placement
// 1 - placed
var mapOfPlacement = new Map();
mapOfPlacement.set(0, 0)
mapOfPlacement.set(1, 0)
mapOfPlacement.set(2, 0)
mapOfPlacement.set(3, 0)
mapOfPlacement.set(4, 0)
mapOfPlacement.set(5, 0)
mapOfPlacement.set(6, 0)

var currSelectionKey = 0;
var currSize = 10;

// setup 
var data = {
  datasets: []
};

// create buttons
mapOfEvolution.forEach((values, keys) => {
  // populate database
  //console.log(values, keys)
  data.datasets.push({
    type: 'scatter',
    label: values,
    data: [
      //{ x: 10, y: 10 }
    ],
    pointRadius: 20
  })

  //populate buttons
  const newButton = document.createElement("button");
  const buttonText = document.createTextNode(values);
  newButton.appendChild(buttonText);
  newButton.id = values;
  newButton.onclick = () => {
    //console.log(values)
    updateBtns(keys)
  };

  const buttonsDiv = document.getElementById('buttonsDiv')
  buttonsDiv.appendChild(newButton);
});

// update buttons according to selection
updateBtns(currSelectionKey)

function updateBtns(newSelectionKey) {
  currSelectionKey = newSelectionKey;

  var currSelectedId = mapOfEvolution.get(newSelectionKey)
  console.log(currSelectedId);

  // set all other button according to their placement
  mapOfPlacement.forEach((values, keys) => {
    // placement values 
    // get its selection value & update visual
    var currIterationId = mapOfEvolution.get(keys)
    if (keys == currSelectionKey) {
      document.getElementById(currIterationId).setAttribute("class", "selected")
    } else if (values == 0) {
      document.getElementById(currIterationId).setAttribute("class", "unselected")
    } else {
      document.getElementById(currIterationId).setAttribute("class", "added")
    }
  })
}

const font = {
  size: 20,
}
// Render chart inititally
const myChart = new Chart(
  document.getElementById('myChart'), {
  data,
  options: {
    scales: {
      x: {
        title: {
          display: true,
          text: 'Trait distortion',
          font: font
        },
        min: 0,
        max: 10,
      },
      y: {
        title: {
          display: true,
          text: 'Transmission distortion',
          font: font,
        },
        max: 10,
        min: 0,
      }
    },

    plugins: {
      legend: {
        labels: {
          usePointStyle: true,
        }
      }
    },

    // When Chart is clicked
    onClick(e) { chartOnClick(e) },
  }
}
);

// Handles when the chart is clicked
function chartOnClick(e) {
  // coordinates of click relative to canvas
  const { x, y } = Chart.helpers.getRelativePosition(e, myChart);
  // can also use const x = e.native.offsetX, y = e.native.offsetY;

  // get values relative to chart axes
  const dataX = Math.round(myChart.scales.x.getValueForPixel(x) * 100) / 100;
  const dataY = Math.round(myChart.scales.y.getValueForPixel(y) * 100) / 100;

  console.log(dataX, dataY)

  addPoint(dataX, dataY);
}

// Adds a point to the chart 
function addPoint(dataX, dataY) {
  //myChart.config.data.datasets[0].data[0] = barvalue.value;

  // override or add point at click position
  myChart.config.data.datasets[currSelectionKey].data[0] = { x: dataX, y: dataY };
  mapOfPlacement.set(currSelectionKey, 1);
  checkCompletePlacements()

  myChart.update();
}

function checkCompletePlacements() {
  console.log('check complete placements')

  // if all the positions are added then we want to add a submit button
  var boolPlacements = true;
  mapOfPlacement.forEach((values) => {
    if (values == 0) {
      boolPlacements = false;
    }
  })

  //console.log(boolPlacements);
  if (boolPlacements) {
    document.getElementById('submitBtn').removeAttribute("hidden")
  }
}

document.getElementById("submitBtn").addEventListener("click", () => {
  // location.href = "thanks.html"
  console.log('submit')

  var userId = generateUserId();
  console.log(userId)

  mapOfEvolution.forEach((values, keys) => {
    var chartDataForKey = myChart.config.data.datasets[keys].data[0];
    var pointSize = myChart.config.data.datasets[keys].pointRadius;
    console.log(chartDataForKey, pointSize)

    addDoc(colRef, {
      userId: userId,
      key: keys,
      data: chartDataForKey,
      circle_size: pointSize,
    }).then(() => {
      location.href = "thanks.html"
    });
  })

  
}
);

// Testing random number
document.getElementById("random").addEventListener("click", () => {
  var userId = generateUserId();
  console.log(userId);
})

function generateUserId() {
  return Math.round(Math.random()*100000);
}
