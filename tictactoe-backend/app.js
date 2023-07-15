require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');

const db = require('./database/db');
const gameRouter = require('./routers/gameRouter');

main();

function main() {
    db.connect().then(() => {
        console.log('[DB] Successfully connected to the database!');

        const PORT = process.env.PORT || 3000;
        const app = express();
        
        app.use(bodyParser.json());
        app.use('/games', gameRouter);

        app.get('/', (req, res) => {
            res.json({ message: 'Tic-Tac-Toe API!' });
        });

        app.listen(PORT, () => {
            console.log(`[API] Server listening on port ${PORT}`);
        })
    }).catch(err => {
        console.log('[DB] Error connecting to the database.')
        console.log(err);
    })
}