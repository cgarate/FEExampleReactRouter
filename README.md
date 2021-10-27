## Unity Technical Exercise - Frontend Repo

A simple React/JS FE repo with Webpack and Babel.
The client implementation is simple and thought towards showing how the API works. It displays two main options to interact as a Player or as an Ops Team Member.
* Players can submit a review for their last game session
* More than one player can review the same session
* Each player can review each session only once
* Ops team can select a rating to filter reviews on and see the data submitted by players
* The API data has defaults for both users and reviews due to these defaults:
  * Only the first two users (Quagmire and Peter) can submit a review
  * Trying to submit a review with any other user will show a very unfriendly error on the screen (the API will send a `405 status code` in this case)

---
### Running the Frontend client

1. `npm i`  
2. `npm start` (browser should open automatically and load `http://localhost:8080`)

