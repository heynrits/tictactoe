const { validationResult, matchedData } = require('express-validator');
const GameModel = require('../schemas/game');

const getAllGameData = async (req, res) => {
    try {
        const games = await GameModel.find();
        return res.json(games);
    } catch (err) {
        console.log('[API] Error getting all game data.');
        console.log(err);
        return res.status(500).json({ message: 'Error loading all game data.'});
    }
};

const getGameData = async (req, res) => {
    const result = validationResult(req);
    const { gameId } = matchedData(req);

    if (result.isEmpty()) {
        try {
            const game = await GameModel.findById(gameId);
            return res.json(game);
        } catch (err) {
            console.log(`[API] Error getting game data for [${gameId}].`);
            console.log(err);
            return res.status(500).json({ message: `Error loading game data.`});
        }
    }
    
    console.log(`[API] Error getting game data for [${gameId}].`);
    console.log(result.array());
    return res.status(400).json({ message: `Error loading game data.`});
};

const saveGameData = async (req, res) => {
    console.log(req.body)
    const result = validationResult(req);
    const gameData = matchedData(req);

    if (result.isEmpty()) {
        try {
            await GameModel.create(gameData);
            return res.json({ message: "Game data saved successfully!"});
        } catch (err) {
            console.log(`[API] Error saving new game data.`);
            console.log(err);
            return res.status(500).json({ message: `Error saving game data.`});
        }
    }
    
    console.log(`[API] Error saving game data.`);
    console.log(result.array());
    return res.status(400).json({ message: `Error saving game data.`});
};

const updateGameData = async (req, res) => {
    const result = validationResult(req);
    const gameData = matchedData(req);

    if (result.isEmpty()) {
        try {
            await GameModel.findByIdAndUpdate(gameData.gameId, gameData);
            return res.json({ message: "Game data updated successfully!"});
        } catch (err) {
            console.log(`[API] Error updating game data.`);
            console.log(err);
            return res.status(500).json({ message: `Error updating game data.`});
        }
    }
    
    console.log(`[API] Error updating game data.`);
    console.log(result.array());
    return res.status(400).json({ message: `Error updating game data.`});
};

const deleteGameData = async (req, res) => {
    const result = validationResult(req);
    const { gameId } = matchedData(req);

    if (result.isEmpty()) {
        try {
            await GameModel.findByIdAndDelete(gameId);
            return res.json({ message: "Game data deleted successfully!" });
        } catch (err) {
            console.log(`[API] Error deleting game data of [${gameId}].`);
            console.log(err);
            return res.status(500).json({ message: `Error deleting game data.`});
        }
    }
    
    console.log(`[API] Error deleting game data of [${gameId}].`);
    console.log(result.array());
    return res.status(400).json({ message: `Error deleting game data.`});
};

module.exports = {
    getAllGameData,
    getGameData,
    saveGameData,
    updateGameData,
    deleteGameData,
};