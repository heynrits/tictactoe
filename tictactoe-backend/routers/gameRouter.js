const express = require('express');
const gameController = require('../controllers/gameController');
const gameValidator = require('../validators/gameValidator');
const { checkSchema } = require('express-validator');

const router = new express.Router();

router.get('/', gameController.getAllGameData);
router.get(
    '/:gameId',
    checkSchema(gameValidator.gameIdValidator, ['params']),
    gameController.getGameData
);
router.post(
    '/',
    checkSchema(gameValidator.gameDataValidator, ['body']),
    gameController.saveGameData
);
router.put(
    '/:gameId',
    checkSchema(gameValidator.savedGameDataValidator, ['body', 'params']),
    gameController.updateGameData
);
router.delete(
    '/:gameId',
    checkSchema(gameValidator.gameIdValidator, ['params']),
    gameController.deleteGameData
);

module.exports = router;