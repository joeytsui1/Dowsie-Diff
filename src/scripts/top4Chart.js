import { Chart } from 'chart.js/auto';

class Top4Chart {
    constructor(placements) {
        this.placements = placements
        this.hash = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0 }
        this.newArr =[]
        this.getPlacements() 
        this.makeChart()
    }

    getPlacements() {
        for (let i = 0; i < this.placements.length; i++) {
            this.hash[this.placements[i]] += 1
        }

        for (let key in this.hash) {
            this.newArr.push(this.hash[key])
        }
    }

    makeChart() {

        let ctx = document.getElementById('top4');
        let chartStatus = Chart.getChart("top4")
        if (chartStatus != undefined) {
            chartStatus.destroy()
        }
        var chart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['1st', '2nd', '3rd', '4th', '5th', '6th', '7th', '8th'],
                datasets: [{
                    label: 'Placements',
                    data: this.newArr,
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
        console.log(this.chart)
    }
}

export default Top4Chart            


// type: 'bar',
//     data: {
//     labels: labels.names,
//         datasets: [{
//             data: this.data,
//             backgroundColor: new Array(59).fill('blue'),
//         }]
// },
// options: {
//     indexAxis: 'y'
// }
//         });


// labels: ['1st', '2nd', '3rd', '4th', '5th', '6th', '7th', '8th'],