const Auction = require('../models/Auction');

const getAllDontClosedAuctions = () => Auction.find({auctionIsClosed: false}).lean();
const getAllClosedAuctions = () => Auction.find({ auctionIsClosed: true }).lean()

const getOneById = (auctionId) => Auction.findById(auctionId).lean();

const createAuction = (auction) => Auction.create(auction);

const deleteAuction = (auctionId) => Auction.findByIdAndDelete(auctionId);

const editAuction = async (auctionId, auction) => {
    const editedAuction = await Auction.findByIdAndUpdate(auctionId, auction, { runValidators: true })
    return editedAuction;
};



// const commentPhoto = async (photoId, commentData) => {
//     const photo= await Auction.findById(photoId);

//     photo.commentList.push(commentData);
//     photo.save();
//   };

module.exports = {
    getAllDontClosedAuctions,
    getOneById,
    createAuction,
    editAuction,
    deleteAuction,
    getAllClosedAuctions,
};