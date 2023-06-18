const animalController = require('express').Router();
const { isUser, } = require('../middlewares/guardsMW')

const {
    getAll,
    getOneById,
    createAnimal,
    editAnimal,
    deleteAnimal,
    donate

} = require('../services/animalService');
const { parseError } = require('../util/parser');



animalController.get('/create', isUser(), (req, res) => {
    res.render('create', {
        title: 'Create Page',
    });
});

animalController.get('/catalog', async (req, res) => {

    const animals = await getAll()

    res.render('catalog', {
        title: 'Catalog Page',
        animals,
    });
});

animalController.get('/:id/details', async (req, res) => {
    const animalId = req.params.id;
    const userId = req.user?._id;


    const animal = await getOneById(animalId)


    const isOwner = req.user?._id == animal.owner._id;
    const hasDonate = animal.donations.some(x => x == userId)

    res.render('details', {
        title: 'Details Page',
        animal,
        isOwner,
        hasDonate,
    });
});

animalController.get('/:id/delete', isUser(), async (req, res) => {
    const animalId = req.params.id;
    const userId = req.user._id

    const animal = await getOneById(animalId);
    try {
        const isOwner = animal.owner._id == userId;

        if (!isOwner) {
            throw new Error('Only creator can delete animal!');
        }
        await deleteAnimal(animalId);
        res.redirect('/animal/catalog');

    } catch (error) {
        const errors = parseError(error);
        res.render('details', {
            title: 'Details Page',
            errors,
            animal
        });
    };
});

animalController.post('/create', isUser(), async (req, res) => {
    const inputData = {
        ...req.body,
        owner: req.user._id,
    };

    try {

        await createAnimal(inputData)
        res.redirect('/animal/catalog')
    } catch (error) {
        const errors = parseError(error);
        res.render('create', {
            title: 'Create Page',
            errors,
            body: inputData
        });
    }
});

animalController.get('/:id/edit', isUser(), async (req, res) => {
    const animalId = req.params.id;
    const userId = req.user._id;
    const animal = await getOneById(animalId);
    const isOwner = animal.owner._id == userId;
    try {
        if (!isOwner) {
            throw new Error('Only creator can edit animal!')
        }

        res.render('edit', {
            title: 'Edit Page',
            animal,
        });
    } catch (error) {
        res.render('details', {
            title: 'Details Page',
            errors: parseError(error),
            animal,
        });
    };
});

animalController.post('/:id/edit', isUser(), async (req, res) => {
    const animalId = req.params.id;
    const userId = req.user._id;
    const animal = await getOneById(animalId);
    const isOwner = animal.owner._id == userId;

    const editedData = req.body;

    try {
        if (!isOwner) {
            throw new Error('Only creator can edit animal!')
        }

        await editAnimal(animalId, editedData);

        res.redirect(`/animal/${animalId}/details`);

    } catch (error) {
        res.render('edit', {
            title: 'Edit Page',
            errors: parseError(error),
            animal,
        });
    }
});

animalController.get('/:id/donate', isUser(), async (req, res) => {
    console.log('donate');
    const animalId = req.params.id;
    const userId = req.user._id;
    const animal = await getOneById(animalId);

    const isOwner = animal.owner._id == userId;

    const hasDonate = animal.donations.some(x => x == userId)

    try {
        if (isOwner) {
            throw new Error('You can not donate for your own animal!')
        };
        if (hasDonate) {
            throw new Error('You have donate for this animal!')
        };

        await donate(animalId, userId);
        return res.redirect(`/animal/${animalId}/details`);


    } catch (error) {
        console.log(error);
        res.render('details', {
            title: 'Details Page',
            errors: parseError(error),
            animal,
            isOwner,
            hasDonate,
        });
    }

});
animalController.get('/search', async (req, res) => {
    const search = req.query?.search;
    let searchResult;
    if (search) {
        const animals = await getAll();
        searchResult = animals.filter(x => x.location.toLowerCase().includes(search.toLowerCase()))

    }


    res.render('search', {
        title: 'Search Page',
        searchResult,
        search

    });
});


module.exports = animalController;