import UserInfo from './scripts/userInfo'
import MatchHistory from './scripts/matchHistory'

document.addEventListener('DOMContentLoaded', () => {
    const submitUsername = document.querySelector("#submit-button-user")
    submitUsername.addEventListener("click", e => {
        e.preventDefault()
        const username = document.querySelector("#username-input").value
        new UserInfo(username)

        new MatchHistory(username);
    })
})

