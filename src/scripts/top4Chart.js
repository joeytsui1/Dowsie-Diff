import Chart from 'chart.js/auto'

class Top4Chart {
    constructor(arr) {
        this.arr = arr
        this.chart = null
    }

    makeChart() {
        let ctx = document.getElementById('top4').getContext('2d');

        // Create the chart by passing in the canvas and chart options
        var myChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['1st', '2nd', '3rd', '4th', '5th', '6th', '7th', '8th'],
                datasets: [{
                    label: 'Placements',
                    data: [ 2, 3, 5, 0, 4, 2, 2, 2],
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)'
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    }
}

export default Top4Chart