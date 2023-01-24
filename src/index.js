import UserInfo from './scripts/userInfo'
import UserRankInfo from './scripts/userRankInfo'
import MatchHistory from './scripts/matchHistory'
import WinRatio from './scripts/winRatio'
import AboutModal from './scripts/aboutModal'
import ChampionModal from './scripts/championModal'
import api_key from "./scripts/apikey.mjs"

document.addEventListener('DOMContentLoaded', () => {
    new AboutModal()
    new ChampionModal()
    
    const API_KEY = api_key
    let myUserName = 'mínasrmy'
    fetch(`https://na1.api.riotgames.com/tft/summoner/v1/summoners/by-name/${myUserName}?api_key=${API_KEY}`)
        .then(response => response.json())
        .then(data => {
            new UserInfo(data)
            new MatchHistory(data, API_KEY)
            return fetch(`https://na1.api.riotgames.com/tft/league/v1/entries/by-summoner/${data.id}?api_key=${API_KEY}`)
                .then(response => response.json())
                .then(data => {
                    if (data.length === 0) {
                        new WinRatio(0, 0)
                    } else {
                        new WinRatio(data[0].wins, data[0].losses)
                    }

                    new UserRankInfo(data)
                })   
        })

    const submitUsername = document.querySelector("#submit-button-user")
    submitUsername.addEventListener("click", e => {
        e.preventDefault()
        const username = document.querySelector("#username-input").value

        fetch(`https://na1.api.riotgames.com/tft/summoner/v1/summoners/by-name/${username}?api_key=${API_KEY}`)
            .then(response => response.json())
            .then(data => {
                new UserInfo(data)
                new MatchHistory(data)
                return fetch(`https://na1.api.riotgames.com/tft/league/v1/entries/by-summoner/${data.id}?api_key=${API_KEY}`)
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
