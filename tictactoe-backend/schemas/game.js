const mongoose = require('mongoose');

const GameSchema = new mongoose.Schema({
    p1: {
        name: String,
        winCount: Number,
    },
    p2: {
        name: String,
        winCount: Number,
    },
    drawCount: Number,
    modeAI: Boolean,
}, {
    timestamps: true
});

const Game = mongoose.model('Game', GameSchema);

module.exports = Game;