import Top4Chart from "./top4Chart.js"

class MatchHistory {
    constructor(userInput) {
        this.userInput = userInput
        this.url = `https://na1.api.riotgames.com/tft/summoner/v1/summoners/by-name/${this.userInput}?api_key=RGAPI-bfbe1f08-3017-4d7f-9dbc-123f5368a187`
        this.puuid;
        this.placements = []
        this.getMatches()
    }

    resetTable() {
        let table = document.querySelector("#table")
        table.innerHTML = ""
    }

    getMatchData(puuid) {
        return fetch(`https://americas.api.riotgames.com/tft/match/v1/matches/by-puuid/${puuid}/ids?start=0&count=20&api_key=RGAPI-bfbe1f08-3017-4d7f-9dbc-123f5368a187`)
            .then(response => response.json())
            .then(data => {
                const matches = data.map(match => {
                    return fetch(`https://americas.api.riotgames.com/tft/match/v1/matches/${match}?api_key=RGAPI-bfbe1f08-3017-4d7f-9dbc-123f5368a187`)
                })
                return Promise.all(matches)
            })
            .then(matchResponses => Promise.all(matchResponses.map(res => res.json())))
    }

    getMatches(url = this.url) {
        fetch(url)
            .then(response => response.json())
            .then(data => {
                this.puuid = data.puuid
                return this.getMatchData(this.puuid)
            })
            .then(matches => {
                this.resetTable()
                matches.forEach(match => {
                    this.displayMatches(match)
                })
            })
            .catch(err => err);
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
                if (players[i] === this.puuid) {
                    index = i
                }
            }
            this.placements.push(match.info.participants[index].placement)
            matchOutcomeCell.innerHTML = match.info.participants[index].placement
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

    makeTop4Chart() {
        this.chart = new Top4Chart(this.placements)
        this.chart.makeChart()
    }
}

export default MatchHistory