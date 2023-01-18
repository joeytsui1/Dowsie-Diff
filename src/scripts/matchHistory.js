import Top4Chart from "./top4Chart.js"
import UnitStats from "./unitStats.js"

class MatchHistory {
    constructor(data) {
        this.data = data
        this.data.puuid;
        this.placements = []
        this.unitsPlayed = []
        this.getMatchData()
    }

    resetTable() {
        let table = document.querySelector("#table")
        table.innerHTML = ""
    }

    getMatchData() {
        fetch(`https://americas.api.riotgames.com/tft/match/v1/matches/by-puuid/${this.data.puuid}/ids?start=0&count=20&api_key=RGAPI-e1c21f24-b87a-44fe-bda6-37336e73c8a6`)
            .then(response => response.json())
            .then(data => {
                const matches = data.map(match => {
                    return fetch(`https://americas.api.riotgames.com/tft/match/v1/matches/${match}?api_key=RGAPI-e1c21f24-b87a-44fe-bda6-37336e73c8a6`)
                })
                return Promise.all(matches)
            })
            .then(matchResponses => Promise.all(matchResponses.map(res => res.json())))
            .then(matches => {
                this.resetTable()
                matches.forEach(match => {
                    this.displayMatches(match)
                })

                new Top4Chart(this.placements)
                new UnitStats(this.unitsPlayed)
            })
            .catch(err => err)
    }

    displayMatches(match) {
        if (match.info.tft_set_number === 8) {
            let table = document.querySelector("#table")
            let row = table.insertRow();

            let placement = row.insertCell();
            let unitsInGame = row.insertCell();

            let players = match.metadata.participants
            let index;
            for (let i = 0; i < players.length; i++) {
                if (players[i] === this.data.puuid) {
                    index = i
                }
            }
            if (match.info.queue_id === 1100) {
                if (match.info.participants[index].placement === 1) {
                    placement.innerHTML = `${match.info.participants[index].placement}st`
                } else if (match.info.participants[index].placement === 2) {
                    placement.innerHTML = `${match.info.participants[index].placement}nd`
                } else if (match.info.participants[index].placement === 3) {
                    placement.innerHTML = `${match.info.participants[index].placement}rd`
                } else {
                    placement.innerHTML = `${match.info.participants[index].placement}th`
                }

                this.placements.push(match.info.participants[index].placement)
                let units = match.info.participants[index].units

                units.forEach(unit => {
                    let img = document.createElement("img")
                    let unitName;
                    if (unit.character_id === "TFT8_WuKong") {
                        unitName = unit.character_id.slice(0, 7) + unit.character_id.slice(7, 8).toLowerCase() + unit.character_id.slice(8)
                        img.src = `https://ddragon.leagueoflegends.com/cdn/13.1.1/img/tft-hero-augment/${unitName}.TFT_Set8.png`
                        img.setAttribute('class', `${unitName.slice(5)}`)
                        unitsInGame.appendChild(img)
                        this.unitsPlayed.push(unitName)
                    } else {
                        unitName = unit.character_id
                        img.src = `https://ddragon.leagueoflegends.com/cdn/13.1.1/img/tft-hero-augment/${unitName}.TFT_Set8.png`
                        img.setAttribute('class', `${unitName.slice(5) }`)
                        unitsInGame.appendChild(img)
                        this.unitsPlayed.push(unitName)
                    }

                })
            }
        }
    }
}

export default MatchHistory