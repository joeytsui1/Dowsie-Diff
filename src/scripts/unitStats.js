import { Chart, Colors } from 'chart.js/auto';

class UnitStats {
    constructor(unitsPlayed) {
        this.unitsPlayed = unitsPlayed
        this.hash = {}
        this.unitName = []
        this.numsTimePlayed = []
        this.makeHash()
        this.sortHash()
        this.makeChart()
    }

    makeHash() {
        for (let i = 0; i < this.unitsPlayed.length; i++) {
            if (!this.hash[this.unitsPlayed[i]]){
                this.hash[this.unitsPlayed[i]] = 1
            } else {
                this.hash[this.unitsPlayed[i]] += 1
            }
        }
    }

    sortHash() {
        const sortedHash = Object.entries(this.hash)
            .sort((a, b) => b[1] - a[1])
            .reduce((obj, [key, value]) => {
                obj[key] = value;
                return obj;
            }, {});
        this.hash = sortedHash;

        for (let key in this.hash) {
            this.unitName.push(key.slice(5))
            this.numsTimePlayed.push(this.hash[key])
        }
    }

    makeChart() {

        let ctx = document.getElementById('units-played');
        let chartStatus = Chart.getChart("units-played")
        if (chartStatus != undefined) {
            chartStatus.destroy()
        }
        var chart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: this.unitName,
                datasets: [{
                    label: ['Number of times played'], 
                    data: this.numsTimePlayed,
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.75)',
                        'rgba(54, 162, 235, 0.75)',
                        'rgba(255, 206, 86, 0.75)',
                        'rgba(75, 192, 192, 0.75)',
                        'rgba(153, 102, 255, 0.75)',
                        'rgba(255, 159, 64, 0.75)'
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
                        beginAtZero: true,
                        ticks: {
                            color: "white"
                        }
                    },
                    x: {
                        ticks: {
                            color: "white"
                        }
                    }
                }
            }
        });
    }
}

export default UnitStats