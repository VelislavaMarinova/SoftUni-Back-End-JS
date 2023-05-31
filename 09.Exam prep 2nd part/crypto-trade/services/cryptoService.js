const CryptoOffer = require('../models/CryptoOffer')

exports.getAll = () => CryptoOffer.find({});

exports.getOne = (cryptoOfferId) => CryptoOffer.findById(cryptoOfferId);

exports.buy = async (userId, cryptoOfferId, res) => {
    // CryptoOffer.findByIdAndUpdate(cryptoOfferId, {$push: {buyers: userId}});
    const cryptoOffer = await CryptoOffer.findById(cryptoOfferId);
    const isOwner = cryptoOffer.ownerId == userId
    console.log(isOwner);
    //todo check if user has alredy bought cryptoOffer;
    if (isOwner) {
        console.log('OWNER');
        throw new Error("Forbiden page!")
    }
    cryptoOffer.buyers.push(userId)
    return cryptoOffer.save();

}

exports.create = (ownerId, cryptoOfferData) => CryptoOffer.create({ ...cryptoOfferData, ownerId: ownerId });

exports.edit = (cryptoOfferId, cryptoOfferData) => CryptoOffer.findByIdAndUpdate(cryptoOfferId, cryptoOfferData);

exports.delete = (cryptoOfferId) => CryptoOffer.findByIdAndDelete(cryptoOfferId);