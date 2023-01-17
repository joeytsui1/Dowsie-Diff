class UserInfo {

    constructor(data) {
        this.data
        this.summonerInfo(data)
    }

    summonerInfo(data) {
        let iconId = data.profileIconId
        let image = document.querySelector('#icon-pic')
        image.src = `https://ddragon.leagueoflegends.com/cdn/13.1.1/img/profileicon/${iconId}.png`

        const lvl = document.querySelector("#summoner-level")
        username.innerHTML = `${data.name}`;
        lvl.innerHTML = `Level ${data.summonerLevel}`
    }
}

export default UserInfo