const gameIdValidator = { gameId: {
    isMongoId: true,
}};

const gameDataValidator = {
    "p1.name": {
        notEmpty: true,
    },
    "p1.winCount": {
        isNumeric: true,
    },
    "p2.name": {
        notEmpty: true,
    },
    "p2.winCount": {
        isNumeric: true,
    },
    drawCount: {
        isNumeric: true,
    },
    modeAI: {
        isBoolean: true,
    }
};

const savedGameDataValidator = {
    ...gameIdValidator,
    ...gameDataValidator,
};

module.exports = {
    gameIdValidator,
    gameDataValidator,
    savedGameDataValidator,
};