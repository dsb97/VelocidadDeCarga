/* globals Chart:false, feather:false */

function cargarGrafico(hoy) {
  'use strict'

  //feather.replace({ 'aria-hidden': 'true' })

  // Graphs
  var ctx = document.getElementById('myChart');
  var fechas = [];
  // eslint-disable-next-line no-unused-vars
  for (let i = 6; i >= 0; i--) {
    let fecha = new Date();
    fecha.setDate(fecha.getDate() - i);
    let aaaa = fecha.getFullYear();
    let mm = fecha.getMonth() + 1;
    let dd = fecha.getDate();
    fechas.push(`${dd}/${mm}/${aaaa}`);
  }

  var myChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: fechas,
      datasets: [{
        data: [
          random(100, 10000),
          random(100, 10000),
          random(100, 10000),
          random(100, 10000),
          random(100, 10000),
          random(100, 10000),
          hoy
        ],
        lineTension: 0,
        backgroundColor: 'transparent',
        borderColor: '#007bff',
        borderWidth: 4,
        pointBackgroundColor: '#007bff'
      }]
    },
    options: {
      tooltips: {
        callbacks: {
          label: function (tooltipItem, data) {
            var moneda = (document.getElementById('tradingTittle').innerHTML.toString().split(' ')[2]);
            moneda = moneda.replace('(', '').replace(')', '');
            var label = Math.round(tooltipItem.yLabel * 100) / 100;
            label = `1 EUR = ${label} ${moneda}`
            return label;
          }
        }
      },
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: false
          }
        }]
      },
      legend: {
        display: false
      }
    }
  });
}



