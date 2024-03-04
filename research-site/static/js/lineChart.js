/*
  Demonstrate how to create a line chart
*/

async function getData() {
    const response = await fetch("static/data/RPr.csv");
    const data = await response.text(); // CSV is in TEXT format
    //console.log(data);
  
    const xYears = []; // x-axis labels = years values
    const yTemps = []; // y-axis global temp values
    const yNHtemps = []; // y-axis Northern Hemisphere temp values
    const ySHtemps = []; // y-axis Southern Hemisphere temp values
  
    // \n = new line character
    // split('\n') will separate table into an array of individual rows
    // slice(start, end) - return a new array starting at index start
    //   up to but not including index end
    const table = data.split("\n").slice(1);
   // console.log(table);
  
    table.forEach((row) => {
      const columns = row.split(","); // split each row on the commas
      const year = columns[0];        // assign year value
      xYears.push(year);              // push year value into xYears array
      
      const temp = parseFloat(columns[1]);
      yTemps.push(temp);         // push temp values + 14 to store mean temp values
      
      const nhTemp = parseFloat(columns[2]);  // n. hei. temp deviation values
      yNHtemps.push(nhTemp);             // push temp values + 14 to store mean temp values
  
      const shTemp = parseFloat(columns[3]);  // s. hemi. temp deviation values
      ySHtemps.push(shTemp);             // push temp values + 14 to store mean temp values
  
     // console.log(year, temp, nhTemp, shTemp)
    });
return {xYears, yTemps, yNHtemps, ySHtemps} 
}
  
async function createChart(){
    const data = await getData(); //createChart will wait until getData() is finished processing
    const ctx = document.getElementById('myChart');
    const degSym = String.fromCharCode(176);
    const myChart = new Chart(ctx,{
        type: 'line',
        data: {
            labels: data.xYears,
            datasets: [
                {
                    label: `Total Colony Area for Experimental Plate 1 in cm squared`,
                    data: data.yTemps,
                    fill: false,
                    backgroundColor: 'rgba(255,99,132, 0.2)',
                    borderColor: 'rgba(255,99,132, 1)',
                    borderWidth: 1
                },
                {
                    label: `Total Colony Area for Experimental Plate 2 in cm squared`,
                    data: data.yNHtemps,
                    fill: false,
                    backgroundColor: 'rgba(0,99,132, 0.2)',
                    borderColor: 'rgba(0,99,132, 1)',
                    borderWidth: 1
                },
                {
                    label: `Total Colony Area for Experimental Plate 3 in cm squared`,
                    data: data.ySHtemps,
                    fill: false,
                    backgroundColor: 'rgba(69,42,0, 0.2)',
                    borderColor: 'rgba(69,42,0, 1)',
                    borderWidth: 1
                }
            ]
        },
           options:{
            maintainAspectRatio: true,
            responsive: true, //resize based on screen size
            scales: {
                x:{
                    title: {
                        display:true,
                        text: 'Day', //x-axis title
                        font: { //font properties
                            size: 20
                        },
                    },
                    ticks: {
                        font: {
                            size:16
                        }
                    },
                },
                y:{
                    min:25,
                    max:45,

                    title: {
                        display:true,
                        text: 'Total Colony Area in cm squared', //x-axis title
                        font: { //font properties
                            size: 20
                        },
                    },
                    ticks: {
                        //maxTicksLimit: data.yTemps.length/2, //limit of number of tick marks
                        font: {
                            size:12
                        }
                    },
                }             
            },
            plugins: { //display options
                title: {
                    display: true,
                    text: 'Fusarium Oxysporum Colony Sizes for 22 days',
                    font:{
                        size: 24
                    },
                    padding: {
                        top: 10,
                        bottom: 30
                    }
                },
                legend: {
                    align: 'start',
                    position: 'bottom'
                }
            }
           } 
        });

    }


createChart();
