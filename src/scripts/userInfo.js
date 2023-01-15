class UserInfo {

    constructor(userInput) {
        this.userInput = userInput
        this.getData()
    }

    getData(url = `https://na1.api.riotgames.com/tft/summoner/v1/summoners/by-name/${this.userInput}?api_key=RGAPI-bfbe1f08-3017-4d7f-9dbc-123f5368a187`) {
        fetch(url).then(response => {
            return response.json()
        }).then(data => {
            let summonerData = data
            return summonerData
        }).then((summonerData) => {
            this.summonerInfo(summonerData)
            return summonerData
        }).then((summonerData) => {
            fetch(`https://na1.api.riotgames.com/tft/league/v1/entries/by-summoner/${summonerData.id}?api_key=RGAPI-bfbe1f08-3017-4d7f-9dbc-123f5368a187`)
                .then(response => response.json())
                .then(data => {
                    let summonerRankData = data
                    return summonerRankData
                }).then((summonerRankData) => {
                    this.summonerRankData(summonerRankData)
                })
        }).catch(error => {
            alert("User not found")
        })
    }

    summonerInfo(data) {
        let iconId = data.profileIconId
        let image = document.querySelector('#icon-pic')
        image.src = `https://ddragon.leagueoflegends.com/cdn/13.1.1/img/profileicon/${iconId}.png`

        const lvl = document.querySelector("#summoner-level")
        username.innerHTML = `${data.name}`;
        lvl.innerHTML = `level ${data.summonerLevel}`
    }

    summonerRankData(data) {
        let rankPic = document.querySelector("#rank-pic");
        let rank = data.length === 0 ? "Provisional" : data[0].tier.slice(0, 1) + data[0].tier.slice(1).toLowerCase();
        if (data.length === 0) {
            document.querySelector("#rank").innerHTML = `Unranked`;
            document.querySelector("#tier").innerHTML = `0`;
            document.querySelector("#wins").innerHTML = `Wins: 0`;
            document.querySelector("#losses").innerHTML = `Losses: 0`;
            document.querySelector("#lp").innerHTML = `LP: 0`;
        } else {
            if (data[0].tier === "GRANDMASTER") {
                rank = data[0].tier.slice(0, 1) + data[0].tier.slice(1, 5).toLowerCase() + data[0].tier.slice(5, 6) + data[0].tier.slice(6).toLowerCase();
            }
            document.querySelector("#rank").innerHTML = `${data[0].tier}`;
            document.querySelector("#tier").innerHTML = `${data[0].rank}`;
            document.querySelector("#wins").innerHTML = `Wins: ${data[0].wins}`;
            document.querySelector("#losses").innerHTML = `Losses: ${data[0].losses}`;
            document.querySelector("#lp").innerHTML = `LP: ${data[0].leaguePoints}`;
        }
        rankPic.src = `https://ddragon.leagueoflegends.com/cdn/13.1.1/img/tft-regalia/TFT_Regalia_${rank}.png`;

    }
}

export default UserInfo