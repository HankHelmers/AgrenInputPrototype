


const data = {
    labels: ['Twelve Problems', '2D Array', 'Hashmap', 'HW Quiz'],
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
