import UserInfo from './scripts/userInfo'
import UserRankInfo from './scripts/userRankInfo'
import MatchHistory from './scripts/matchHistory'
import WinRatio from './scripts/winRatio'


document.addEventListener('DOMContentLoaded', () => {

    const modal = document.querySelector(".modal");
    const overlay = document.querySelector(".overlay");
    const openModalBtn = document.querySelector(".btn-open");
    const closeModalBtn = document.querySelector(".btn-close");

    
    const openModal = function () {
        modal.classList.remove("hidden");
        overlay.classList.remove("hidden");
    };

    openModalBtn.addEventListener("click", openModal);


    const closeModal = function () {
        modal.classList.add("hidden");
        overlay.classList.add("hidden");
    };
    
    closeModalBtn.addEventListener("click", closeModal);

    overlay.addEventListener("click", closeModal);

    // let myUserName = 'mínasrmy'
    // fetch(`https://na1.api.riotgames.com/tft/summoner/v1/summoners/by-name/${myUserName}?api_key=RGAPI-454a7b84-67c2-4feb-9a70-40ca2aa62c05`)
    //     .then(response => response.json())
    //     .then(data => {
    //         new UserInfo(data)
    //         new MatchHistory(data)
    //         return fetch(`https://na1.api.riotgames.com/tft/league/v1/entries/by-summoner/${data.id}?api_key=RGAPI-454a7b84-67c2-4feb-9a70-40ca2aa62c05`)
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

        fetch(`https://na1.api.riotgames.com/tft/summoner/v1/summoners/by-name/${username}?api_key=RGAPI-454a7b84-67c2-4feb-9a70-40ca2aa62c05`)
            .then(response => response.json())
            .then(data => {
                new UserInfo(data)
                new MatchHistory(data)
                return fetch(`https://na1.api.riotgames.com/tft/league/v1/entries/by-summoner/${data.id}?api_key=RGAPI-454a7b84-67c2-4feb-9a70-40ca2aa62c05`)
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
