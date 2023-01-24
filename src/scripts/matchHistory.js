
import Top4Chart from "./top4Chart.js"
import UnitStats from "./unitStats.js"
import api_key from "./apikey.mjs"

class MatchHistory {
    constructor(data, api) {
        this.api = api_key
        this.data = data
        this.data.puuid;
        this.placements = []
        this.unitsPlayed = []
        this.top4forUnits = {}  
        this.getMatchData()
    }

    resetTable() {
        let table = document.querySelector("#table")
        table.innerHTML = ""
    }

    getMatchData() {
        fetch(`https://americas.api.riotgames.com/tft/match/v1/matches/by-puuid/${this.data.puuid}/ids?start=0&count=20&api_key=${this.api}`)
            .then(response => response.json())
            .then(data => {
                const matches = data.map(match => {
                    return fetch(`https://americas.api.riotgames.com/tft/match/v1/matches/${match}?api_key=${this.api}`)
                })
                return Promise.all(matches)
            })
            .then(matchResponses => Promise.all(matchResponses.map(res => res.json())))
            .then(matches => {
                this.resetTable()
                let table = document.querySelector("#table")
                var header = table.createTHead()
                header.id = "header-row"
                let headerRow = header.insertRow(0);

                let placementHeader = headerRow.insertCell();
                placementHeader.id = "header1"
                let unitsInGameHeader = headerRow.insertCell();
                unitsInGameHeader.id = "header"
                placementHeader.innerHTML = "Placement"
                unitsInGameHeader.innerHTML = "Units in Game"   
                matches.forEach(match => {
                    this.displayMatches(match)
                })

                new Top4Chart(this.placements)
                new UnitStats(this.unitsPlayed)
                new Modals()
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
                let eachPlacement = match.info.participants[index].placement
                if (eachPlacement === 1) {
                    placement.innerHTML = `${eachPlacement}st`
                } else if (eachPlacement === 2) {
                    placement.innerHTML = `${eachPlacement}nd`
                } else if (eachPlacement === 3) {
                    placement.innerHTML = `${eachPlacement}rd`
                } else {
                    placement.innerHTML = `${eachPlacement}th`
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
                        img.setAttribute('title', `${unitName.slice(5)}`)
                        unitsInGame.appendChild(img)
                        this.unitsPlayed.push(unitName)
                    } else {
                        unitName = unit.character_id
                        img.src = `https://ddragon.leagueoflegends.com/cdn/13.1.1/img/tft-hero-augment/${unitName}.TFT_Set8.png`
                        img.setAttribute('class', `${unitName.slice(5)}`)
                        img.setAttribute('title', `${unitName.slice(5)}`)
                        unitsInGame.appendChild(img)
                        this.unitsPlayed.push(unitName)
                    }

                })           
            }
        }
    }
}


export default MatchHistory