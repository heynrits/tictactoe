# Tic-Tac-Toe Game

Welcome to the Tic-Tac-Toe Game, a full-stack web application implemented using the MERN stack. This game features the classic Tic-Tac-Toe experience that you can play with a friend in two-player mode. In addition, it offers a one-player mode with an AI opponent powered by the min-max algorithm, which makes the gameplay experience challenging (and unbeatable 👀).

The following sections contain relevant information on how to setup and run the backend server and front-end client of the web application.

### Server

#### Environment Variables
Create a `.env` file inside the `tictactoe-backend` directory with the following environment variables, and fill them in with their appropriate values:
```
PORT=
DB_HOST=
DB_NAME=
DB_CLUSTER=
DB_USERNAME=
DB_PASSWORD=
CLIENT_HOST=
```

#### Setup
```bash
npm install
```

#### Starting the server
```bash
node app.js
```

### Client

#### Environment Variables
Create a `.env` file inside the `tictactoe-frontend` directory with the following environment variables, and fill them in with their appropriate values:
```
VITE_API_PATH=
```

#### Setup
```bash
npm install
```

#### Starting the client
```bash
npm run dev
```