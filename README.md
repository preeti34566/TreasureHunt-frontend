# Treasure Hunt | Frontend

### Backend code Repo : [Treasure Hunt Backend](https://github.com/preeti34566/TreasueHunt-backend)


## Features

- Authentication using Firebase
- Frontend routing using react-router-dom
- Backend written in Golang
- NoSQL Database by MongoDB
- Application hosted on cloud, all up and running. 

## Tools & Technologies

- React JS
- react-router-dom
- Javascript
- Golang
- HTML
- CSS, Bootstrap, styled-components
- Firebase Authentication
- MongoDB, MongoDB compass, MongoDB Atlas
- go-chi for backend routing
- Render web services for hosting backend code
- Vercel for Hosting frontend website

## How Authentication Works

On Treasure Hunt players have two ways to login, using PlayerId and Password or they can directly login via gmail account.

When player do continue with google, my platform checks if this email have account on TreasureHunt or not. 
- If no account is found it creates a new account for the player with a PlayerId & generates a unique password. **You need to save/copy  your password at that time; a pop-up will show up with password and option to copy. I am not storing password in my database only SHA256 hash of the generated password is stored. Player have all the responsiblity of his/her password.** If an account is found in database then player is directly lead to Game after authentication.

- PlayerId format : It is generated using the email. { example34@gmail.com will have a playerId of  **example34** }
- Admin credentials: **Player Id** : devactpreeti | **Password** : oE-4x


## How the game Works

The game is supposed to have 5 clues 2 dead-ends and 1 solution.

- Game is still under development so game logic is not implemented completely. | Reason: Time Constraint
- **Level 1 Corss the Caves** of game is about solving a riddle to get the first key of 5 keys to win the game. The solution to this riddle is cave number 20 as the riddle is referencing a Youtube Channel (T-Series) and T comes at 20th place in alphabet.

- I have designed others level too, like solving an mathematial **Keypad Puzzle**, Reasoning and mental-math based calculation which lets the palyer brainstorm and comes with a solution in limited time.

- I have tried and written the code to make the game interactive, players can move using arrow keys.

## Installation

Install the dependencies and devDependencies and start the server at localhost.

```sh
git clone https://github.com/preeti34566/TreasureHunt-frontend.git
cd TreasureHunt-frontend
npm install
npm start
```

## Screenshots
 **Login Page**
 
![Screenshot from 2023-04-17 09-32-54](https://user-images.githubusercontent.com/120567741/232442292-1d122771-b336-4adc-b464-d48595e44586.png)

**Home Page**

![Screenshot from 2023-04-17 14-53-35](https://user-images.githubusercontent.com/120567741/232442753-09d64c0e-61b5-4727-9770-30b0c6ab5744.png)

## License

MIT



