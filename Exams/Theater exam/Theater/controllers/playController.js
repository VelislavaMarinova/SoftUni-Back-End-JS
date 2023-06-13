const { isUser } = require('../middlewares/guardsMW');
const { create, getOneById, deleteById, edit, likePlay } = require('../services/playService');
const { parseError } = require('../util/parser');

const playController = require('express').Router();



playController.get('/create', isUser(), (req, res) => {
    res.render('create', {
        title: 'Create Play',
    });
});

playController.get('/:id/edit', isUser(), async (req, res) => {
    const playId = req.params.id;
    const userId = req.user._id;
    const play = await getOneById(playId);
    const isOwner = play.ownerId == userId;
    console.log(play);

    if (!isOwner) {
        return res.redirect('/');
    }

    res.render('edit', {
        title: 'Edit Course',
        play,
    })
});



playController.get('/:id', isUser(), async (req, res) => {
    const playId = req.params.id;
    const userId = req.user._id;

    const play = await getOneById(playId);

    play.isOwner = play.ownerId == userId;
    play.hasLiked = play.likes.some(x => x == userId)
    // play.enrolled = play.users.some(x => x == userId);


    res.render('details', {
        title: 'Play Details',
        play
    })
});


playController.post('/create', isUser(), async (req, res) => {
    const play = req.body;
    //add ownerId 
    play.ownerId = req.user._id;
    console.log('public', req.body.public);
    if (req.body.public == 'on') {
        play.isPublic = true;
    }
    // const course = {
    //     title: req.body.title,
    //     description: req.body.description,
    //     imageUrl: req.body.imageUrl,
    //     duration: req.body.duration,
    //     ownerId: req.user._id
    // }
    console.log(play);
    try {

        await create(play)
        res.redirect('/')
    } catch (error) {
        const errors = parseError(error);
        res.render('create', {
            title: 'Create Play',
            errors,
            body: play
        })
    }
});

playController.post('/:id/edit', isUser(), async (req, res) => {
    const playId = req.params.id;
    const userId = req.user._id;
    const play = await getOneById(playId);
    console.log('DB', play);
    console.log('body', req.body);
    const isOwner = play.ownerId == userId;

    if (!isOwner) {
        return res.redirect('/');
    }

    if (req.body.public) {
        play.isPublic = true;
    } else {
        play.isPublic == false
    }

    const edited = {
        title: req.body.title,
        description: req.body.description,
        imageUrl: req.body.imageUrl,
        isPublic: req.body.public ? true : false
    }
    console.log(edited,'edited');

    try {
        // if (Object.values(edited).some(v => !v)) {
        //     throw new Error('All fields are required!');
        // }
        await edit(playId, edited);

        res.redirect(`/play/${playId}`);

    } catch (error) {
        res.render('edit', {
            title: 'Edit Play',
            errors: parseError(error),
            play: req.body,
        });
    }
});

playController.get('/:id/delete', isUser(), async (req, res) => {
    const playId = req.params.id;
    const userId = req.user._id
    const play = await getOneById(playId);
    const isOwner = play.ownerId == userId;

    if (!isOwner) {
        return res.redirect('/');
    }

    await deleteById(playId);
    res.redirect('/')
});

playController.get('/:id/like',isUser(),async(req,res)=>{
    const playId = req.params.id;
    const userId = req.user._id;
    const play = await getOneById(playId);
    const isOwner = play.ownerId == userId;
    const userHasLiked = play.likes.some(x => x == userId)

    if (!isOwner && !userHasLiked) {
        console.log('like');
        await likePlay(playId, userId);
    }

    return res.redirect(`/play/${playId}`);
});


module.exports = playController;