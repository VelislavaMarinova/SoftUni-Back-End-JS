const auctionController = require('express').Router();
const { isUser, } = require('../middlewares/guardsMW');
const { selectAuctionCategory } = require('../util/auctionCategoryUtils')

const {
    createAuction,
    deleteAuction,
    editAuction,
     getAllDontClosedAuctions,
    getOneById,
    getAllClosedAuctions
} = require('../services/auctionService');
const { parseError } = require('../util/parser');



auctionController.get('/create', isUser(), (req, res) => {
    res.render('create', {
        title: 'Create Photo',
    });
});

auctionController.get('/browse', async (req, res) => {

    const auctions = await getAllDontClosedAuctions();
    // res.json(photos)

    res.render('browse', {
        title: 'Browse Page',
        auctions,
    });
});


auctionController.get('/closed',isUser(),async(req,res)=>{
    const closedAuctions = await getAllClosedAuctions();
    console.log(closedAuctions);
    res.render('closedauctions', {
        title: 'Closed Auctions Page',
        closedAuctions,
    });
    
});

auctionController.get('/:id', async (req, res) => {
    const auctionId = req.params.id;
    
    const auction = await getOneById(auctionId);
    console.log('details',auction);
    if (req.user) {
        const userId = req.user._id;
        auction.isOwner = auction.ownerId == userId;
        auction.userIsHighestBidder = auction.bidder == userId
    }
    console.log(auction);
    res.render('details', {
        title: 'Details Page',
        auction,
    });
});

auctionController.get('/:id/delete',isUser(), async (req, res) => {
    const auctionId = req.params.id;
    const userId = req.user._id
    const auction = await getOneById(auctionId);
    const isOwner = auction.ownerId == userId;

    if (!isOwner) {
        return res.redirect('/');
    }
    console.log(auctionId);
    await deleteAuction(auctionId);
    res.redirect('/')
});

auctionController.get('/:id/edit', isUser(), async (req, res) => {
    const auctionId = req.params.id;
    const userId = req.user._id;
    const auction = await getOneById(auctionId);
    const isOwner = auction.ownerId == userId;

    if (!isOwner) {
        return res.redirect('/');
    }
    console.log(auction.category);
    const auctionCategory = selectAuctionCategory(auction.category);
    console.log(auctionCategory);


    res.render('edit', {
        title: 'Edit Auction',
        auction,
        auctionCategory,
    })
});

auctionController.get('/:id/delete', isUser(), async (req, res) => {
    const auctionId = req.params.id;
    const userId = req.user._id
    const auction = await getOneById(auctionId);
    const isOwner = auction.ownerId == userId;

    if (!isOwner) {
        return res.redirect('/');
    }
    console.log(auctionId);
    await deleteById(auctionId);
    res.redirect('/')
});

auctionController.post('/create', isUser(), async (req, res) => {
    const auction = req.body;
    console.log(auction);
    auction.ownerId = req.user._id;
    auction.author = `${req.user.firstName} ` + `${req.user.lastName}`;

    try {

        await createAuction(auction)
        res.redirect('/auction/browse')//to catalog
    } catch (error) {
        const errors = parseError(error);
        res.render('create', {
            title: 'Create Photo',
            errors,
            body: auction
        })
    }
});

auctionController.post('/:id/edit', isUser(), async (req, res) => {
    const auctionId = req.params.id;
    const userId = req.user._id;
    const auction = await getOneById(auctionId);
    const isOwner = auction.ownerId == userId;

    if (!isOwner) {
        return res.redirect('/');
    }
    const edited = req.body

    try {
        if (Object.values(edited).some(v => !v)) {
            throw new Error('All fields are required!');
        }
        await editAuction(auctionId, edited);

        res.redirect(`/auction/${auctionId}`);

    } catch (error) {
        res.render('edit', {
            title: 'Edit Course',
            errors: parseError(error),
            auction: req.body,
        });
    }
});

auctionController.post('/:id/bid', isUser(), async (req, res) => {
    const auctionId = req.params.id;
    const userId = req.user._id;
    const bid = req.body.bid
    console.log('bid', req.body.bid);

    const auction = await getOneById(auctionId);

    auction.isOwner = auction.ownerId == userId;

    // console.log(req.user.username,req.body.comment);

    try {
        if (auction.isOwner) {
            throw new Error('Cannot comment your own photo')
        }
        if (auction.price > bid) {
            throw new Error('Cannot place bid that is smaller then current price!')
        }

        auction.price = bid
        auction.bidderName = `${req.user.firstName} ` + `${req.user.lastName}`;
        auction.bidder = userId;
        console.log('bidderName',auction.bidderName);

        await editAuction(auctionId, auction);

        res.redirect(`/auction/${auctionId}`)
    } catch (error) {
        const errors = parseError(error);
        res.render('details', {
            title: 'Details Page',
            errors,
            auction,
        });
    }

});

auctionController.get('/:id/close',isUser(),async (req,res)=>{
    console.log('close');
    const auctionId = req.params.id;
    const auction = await getOneById(auctionId);
    auction.auctionIsClosed= true

    try {
      
        await editAuction(auctionId, auction);

        res.redirect(`/auction/closed`);

    } catch (error) {
        res.render('details', {
            title: 'Edit Course',
            errors: parseError(error),
            auction,
        });
    }
});


module.exports = auctionController