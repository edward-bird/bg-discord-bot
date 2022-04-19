const QuickChart = require('quickchart-js');

const getGraphUrl = (data) => {
    let dataMass = [];
    let labelMass = [];
    let prevMmr = data[0]['mmr'];
    data.forEach((elem) => {
        if (Math.abs(elem['mmr'] - prevMmr) < 400){
            dataMass.push(elem['mmr']);
            labelMass.push(elem['date']);
            prevMmr = elem['mmr'];
        }
    })

    const chart = new QuickChart();
    chart.setWidth(1200)
    chart.setHeight(400);
    chart.setConfig({
        type: 'sparkline',
        data: {
            datasets: [{
                data: dataMass,
                fill: false,
                borderColor: QuickChart.getGradientFillHelper('vertical', ['#eb3639', '#a336eb', '#36a2eb']),
                borderWidth: 1,
                pointRadius: 1,
            }],
            labels: labelMass,
        },
        options: {
            legend: {
                display: false
            },
            scales: {
                xAxes: [{
                    display: true,
                    gridLines: {
                        display: true,
                    },
                }],
                yAxes: [{
                    display: true,
                    gridLines: {
                        display: true,
                    },
                }]
            },
        }
    });
    return chart.getUrl();
}

module.exports = {getGraphUrl}