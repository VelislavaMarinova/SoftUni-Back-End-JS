const gameController = require('express').Router();
const { isUser, isGuest } = require('../middlewares/guardsMW')

const { createGame, getAll, getOneById, deleteGame, editGame, buyGame, getSearch } = require('../services/gameService');
const { parseError } = require('../util/parser');
const { selectPlatform } = require('../util/platform')

gameController.get('/search', async (req, res) => {
    let searchName;
    let searchPlatform;
    if (req.query.search) {
        searchName = req.query.search[0]
        searchPlatform = req.query.search[1]
    }

    let games = await getAll();

    if (searchName) {
        const regex = new RegExp(searchName, "i");
        games = games.filter(x => regex.test(x.name));
    }
    if (searchPlatform) {
        const regex = new RegExp(searchPlatform, "i");
        games = games.filter(x => regex.test(x.platform));
    }

    console.log(games);
    res.render('search', {
        title: 'Search Page',
        games,
    });
});

gameController.get('/create', isUser(), (req, res) => {
    res.render('create', {
        title: 'Create Game',
    });
});

gameController.get('/catalog', async (req, res) => {

    const games = await getAll()

    res.render('catalog', {
        title: 'Catalog Page',
        games,
    });
});

gameController.get('/:id', async (req, res) => {
    const gameId = req.params.id;

    const game = await getOneById(gameId);
    if (req.user) {
        const userId = req.user._id;
        game.isOwner = game.ownerId == userId;
        game.isBuyer = game.boughtBy.some(x => x == userId);

    }
    res.render('details', {
        title: 'Details Page',
        game,
    });
});

gameController.get('/:id/delete', isUser(), async (req, res) => {
    const gameId = req.params.id;
    const userId = req.user._id
    const game = await getOneById(gameId);
    const isOwner = game.ownerId == userId;

    if (!isOwner) {
        return res.redirect('/');
    }

    await deleteGame(gameId);
    res.redirect('/game/catalog')
});

gameController.post('/create', isUser(), async (req, res) => {
    const game = req.body;
    game.ownerId = req.user._id;

    try {

        await createGame(game)
        res.redirect('/')//to catalog
    } catch (error) {
        const errors = parseError(error);
        res.render('create', {
            title: 'Create Game',
            errors,
            body:  game 
        })
    }
});

gameController.get('/:id/edit', isUser(), async (req, res) => {
    const gameId = req.params.id;
    const userId = req.user._id;
    const game = await getOneById(gameId);
    const isOwner = game.ownerId == userId;

    if (!isOwner) {
        return res.redirect('/');
    }

    const platform = selectPlatform(game.platform);

    res.render('edit', {
        title: 'Edit Course',
        game,
        platform,
    });

});

gameController.post('/:id/edit', isUser(), async (req, res) => {
    const gameId = req.params.id;
    const userId = req.user._id;
    const game = await getOneById(gameId);
    const isOwner = game.ownerId == userId;

    if (!isOwner) {
        return res.redirect('/');
    }
    const editedGame = req.body;

    try {
        if (Object.values(editedGame).some(v => !v)) {
            throw new Error('All fields are required!');
        }
        const result = await editGame(gameId, editedGame);

        res.redirect(`/game/${gameId}`);

    } catch (error) {
        res.render('edit', {
            title: 'Edit Game',
            errors: parseError(error),
            game: req.body,
        });
    }
});

gameController.get('/:id/buy', async (req, res) => {
    const gameId = req.params.id;
    const userId = req.user._id;
    const game = await getOneById(gameId);
    const isOwner = game.ownerId == userId;
    const userIsBuyer = game.boughtBy.some(x => x == userId)

    if (!isOwner && !userIsBuyer) {
        console.log('IsBuyer');
        await buyGame(gameId, userId);
    }

    return res.redirect(`/game/${gameId}`);
});


module.exports = gameController;