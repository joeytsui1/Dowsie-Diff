import UserInfo from './scripts/userInfo'
import UserRankInfo from './scripts/userRankInfo'
import MatchHistory from './scripts/matchHistory'
import WinRatio from './scripts/winRatio'

document.addEventListener('DOMContentLoaded', () => {

    // let myUserName = 'mínasrmy'
    // fetch(`https://na1.api.riotgames.com/tft/summoner/v1/summoners/by-name/${myUserName}?api_key=RGAPI-e1c21f24-b87a-44fe-bda6-37336e73c8a6`)
    //     .then(response => response.json())
    //     .then(data => {
    //         new UserInfo(data)
    //         new MatchHistory(data)
    //         return fetch(`https://na1.api.riotgames.com/tft/league/v1/entries/by-summoner/${data.id}?api_key=RGAPI-e1c21f24-b87a-44fe-bda6-37336e73c8a6`)
    //             .then(response => response.json())
    //             .then(data => {
    //                 if (data.length === 0) {
    //                     new WinRatio(0, 0)
    //                 } else {
    //                     new WinRatio(data[0].wins, data[0].losses)
    //                 }

    //                 new UserRankInfo(data)
    //             })   
    //     })


    const submitUsername = document.querySelector("#submit-button-user")
    submitUsername.addEventListener("click", e => {
        e.preventDefault()
        const username = document.querySelector("#username-input").value

        fetch(`https://na1.api.riotgames.com/tft/summoner/v1/summoners/by-name/${username}?api_key=RGAPI-e1c21f24-b87a-44fe-bda6-37336e73c8a6`)
            .then(response => response.json())
            .then(data => {
                new UserInfo(data)
                new MatchHistory(data)
                return fetch(`https://na1.api.riotgames.com/tft/league/v1/entries/by-summoner/${data.id}?api_key=RGAPI-e1c21f24-b87a-44fe-bda6-37336e73c8a6`)
                    .then(response => response.json())
                    .then(data => {
                        if(data.length === 0){
                            new WinRatio(0, 0)
                        } else {
                            new WinRatio(data[0].wins, data[0].losses)
                        }
                        
                        new UserRankInfo(data)
                    })
            }).catch(error => {
                alert("User Is Not Found, Try Again")
            })
    })
})
