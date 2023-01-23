# Dowsie Diff
Dowsie Diff is a application where you can find stats of any registered Riot Games account for a game called Team Fight Tactic. This game is an multiplayer chess auto battler, where you purchase units and build a team that will battle with other players' team. The user-friendly interface allows players to easily view their match history, including information such as win rate, average placement, and most frequently used champions.

# Technologies, API, Libraries
- Riot Games API: https://developer.riotgames.com/
- Chart.js: https://www.chartjs.org/

# Wireframe
![image](https://user-images.githubusercontent.com/109801026/213545382-952bac05-8461-443c-a5d6-200911aa41b6.png)


# Functionality & MVP 
- Interactive Visual Charts/Graph/Tables 
- User inputs to fetch data from the Riot Games API
- Dynamically renders the charts and tables with data that we get back from the fetch call

<img width="1728" alt="Screenshot 2023-01-23 at 8 13 10 AM" src="https://user-images.githubusercontent.com/109801026/214048982-ff08fd86-4884-487a-8625-b8295373b538.png">

- Dropped Menu with different costs of units and if clicked in a modal would show up for the unit

- Once you load this application you will be greeted with this modal:
  <img width="772" alt="Screenshot 2023-01-23 at 8 12 16 AM" src="https://user-images.githubusercontent.com/109801026/214048831-2308f00a-63e3-4c02-9594-5dd54ddd7158.png">


# Implementation Timeline
- Friday - Querying the Riot API and storing the data we get so can be implemented to  render in HTML
- Saturday - Started on individuals classes and connect all the pages to each other.
- Sunday - Setting up the HTML with needed tables and divs
- Monday - Rendering the view of User data onto the HTML by using vanilla DOM
- Tuesday - Implementing CSS styling on to the data that is showned in HTML
- Wednesday - Worked on more CSS Styling and added about modal and my social links 
- Thursday - implementing a dropdown menu demo that is for future implementation

# Future Implementation 
- Add more details in the match history such as the game time length, the date of the game, adding a button to either open a drop down or a modal and show the rest of the players that was apart of the game

- Implementing a chart to visualize the ladder point gains or losses of the user, if i am able to find a API to get that data

- Finish the drop down menu to show all of the units modal
