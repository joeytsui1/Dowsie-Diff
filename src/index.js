import UserInfo from './scripts/userInfo'
import UserRankInfo from './scripts/userRankInfo'
import MatchHistory from './scripts/matchHistory'
import WinRatio from './scripts/winRatio'

document.addEventListener('DOMContentLoaded', () => {
    const submitUsername = document.querySelector("#submit-button-user")
    submitUsername.addEventListener("click", e => {
        e.preventDefault()
        const username = document.querySelector("#username-input").value

        fetch(`https://na1.api.riotgames.com/tft/summoner/v1/summoners/by-name/${username}?api_key=RGAPI-3a73e5bf-c55c-43db-a2da-c1ab5aecc22f`)
            .then(response => response.json())
            .then(data => {
                new UserInfo(data)
                new MatchHistory(data)
                return fetch(`https://na1.api.riotgames.com/tft/league/v1/entries/by-summoner/${data.id}?api_key=RGAPI-3a73e5bf-c55c-43db-a2da-c1ab5aecc22f`)
                    .then(response => response.json())
                    .then(data => {
                        // console.log(data)
                        new WinRatio(data[0].wins, data[0].losses)
                        new UserRankInfo(data)
                    })
            })
    })
})



// getData(url = `https://na1.api.riotgames.com/tft/summoner/v1/summoners/by-name/${this.userInput}?api_key=RGAPI-3a73e5bf-c55c-43db-a2da-c1ab5aecc22f`) {
//     fetch(url).then(response => {
//         return response.json()
//     }).then(data => {
//         let summonerData = data
//         return summonerData
//     }).then((summonerData) => {
//         this.summonerInfo(summonerData)
//         return summonerData
//     }).then((summonerData) => {
//         fetch(`https://na1.api.riotgames.com/tft/league/v1/entries/by-summoner/${summonerData.id}?api_key=RGAPI-3a73e5bf-c55c-43db-a2da-c1ab5aecc22f`)
//             .then(response => response.json())
//             .then(data => {
//                 let summonerRankData = data
//                 return summonerRankData
//             }).then((summonerRankData) => {
//                 this.summonerRankData(summonerRankData)
//             })
//     }).catch(error => {
//         alert("User not found")
//     })
// }