import Top4Chart from "./top4Chart.js"

class MatchHistory {
    constructor(data) {
        this.data = data
        this.data.puuid;
        this.placements = []
        this.getMatchData()
    }

    resetTable() {
        let table = document.querySelector("#table")
        table.innerHTML = ""
    }

    getMatchData() {
        fetch(`https://americas.api.riotgames.com/tft/match/v1/matches/by-puuid/${this.data.puuid}/ids?start=0&count=20&api_key=RGAPI-3a73e5bf-c55c-43db-a2da-c1ab5aecc22f`)
            .then(response => response.json())
            .then(data => {
                const matches = data.map(match => {
                    return fetch(`https://americas.api.riotgames.com/tft/match/v1/matches/${match}?api_key=RGAPI-3a73e5bf-c55c-43db-a2da-c1ab5aecc22f`)
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
            })
            .catch(err => err)
    }

    displayMatches(match) {
        if (match.info.tft_set_number === 8) {
            let table = document.querySelector("#table")
            let row = table.insertRow();

            let matchOutcomeCell = row.insertCell();
            let matchUnitsCell = row.insertCell();

            let players = match.metadata.participants
            let index;
            for (let i = 0; i < players.length; i++) {
                if (players[i] === this.data.puuid) {
                    index = i
                }
            }

            matchOutcomeCell.innerHTML = match.info.participants[index].placement
            this.placements.push(match.info.participants[index].placement)
            let units = match.info.participants[index].units

            units.forEach(unit => {
                let img = document.createElement("img")
                let unitName;
                if (unit.character_id === "TFT8_WuKong") {
                    unitName = unit.character_id.slice(0, 7) + unit.character_id.slice(7, 8).toLowerCase() + unit.character_id.slice(8)
                    img.src = `https://ddragon.leagueoflegends.com/cdn/13.1.1/img/tft-hero-augment/${unitName}.TFT_Set8.png`
                    img.setAttribute('id', `unit-cost-${unit.rarity}`)
                    matchUnitsCell.appendChild(img)
                } else {
                    unitName = unit.character_id
                    img.src = `https://ddragon.leagueoflegends.com/cdn/13.1.1/img/tft-hero-augment/${unitName}.TFT_Set8.png`
                    img.setAttribute('id', `unit-cost-${unit.rarity}`)
                    matchUnitsCell.appendChild(img)
                }

            })
        }
    }
}

export default MatchHistory