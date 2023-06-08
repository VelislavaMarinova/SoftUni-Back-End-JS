const Game = require('../models/Game');

const getAll = () => Game.find({}).lean();

const getOneById = (gameId) => Game.findById(gameId).lean();

const createGame = (game) => Game.create(game);

const deleteGame = (gameId) => Game.findByIdAndDelete(gameId);

const editGame = async (id, game) => {
    const editedGame = await Game.findByIdAndUpdate(id, game, { runValidators: true })
    return editedGame;
};

const buyGame = async (courseId, userId) => {
    const existing = await Game.findById(courseId);
    existing.boughtBy.push(userId);
    return existing.save();
};

const getSearch = (searchRegexArray) => Game.find({ title: { $in: searchRegexArray }})

module.exports = {
    getAll,
    getOneById,
    createGame,
    deleteGame,
    editGame,
    buyGame,
    getSearch
}