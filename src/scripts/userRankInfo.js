class UserRankInfo {
    constructor(data) {
        this.data = data
        this.summonerRankData(data)
    }

    summonerRankData(data) {
        let rankPic = document.querySelector("#rank-pic");
        let rank = data.length === 0 ? "Provisional" : data[0].tier.slice(0, 1) + data[0].tier.slice(1).toLowerCase();
        if (data.length === 0) {
            document.querySelector("#rank").innerHTML = `Unranked`;
            document.querySelector("#wins").innerHTML = `Wins: 0`;
            document.querySelector("#losses").innerHTML = `Losses: 0`;
            document.querySelector("#lp").innerHTML = `LP: 0`;
        } else {
            if (data[0].tier === "GRANDMASTER") {
                rank = data[0].tier.slice(0, 1) + data[0].tier.slice(1, 5).toLowerCase() + data[0].tier.slice(5, 6) + data[0].tier.slice(6).toLowerCase();
            }
            document.querySelector("#rank").innerHTML = `${data[0].tier} ${data[0].rank}`;
            document.querySelector("#wins").innerHTML = `Wins: ${data[0].wins}`;
            document.querySelector("#losses").innerHTML = `Losses: ${data[0].losses}`;
            document.querySelector("#lp").innerHTML = `LP: ${data[0].leaguePoints}`;
        }
        rankPic.src = `https://ddragon.leagueoflegends.com/cdn/13.1.1/img/tft-regalia/TFT_Regalia_${rank}.png`;

    }
}

export default UserRankInfo