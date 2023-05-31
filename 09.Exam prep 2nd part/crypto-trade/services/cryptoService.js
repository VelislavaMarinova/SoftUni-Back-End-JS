const CryptoOffer = require('../models/CryptoOffer')

exports.getAll = () => CryptoOffer.find({});

exports.getOne = (cryptoOfferId) => CryptoOffer.findById(cryptoOfferId);

exports.buy = async (userId, cryptoOfferId) => {
    // CryptoOffer.findByIdAndUpdate(cryptoOfferId, {$push: {buyers: userId}});
    const cryptoOffer = await CryptoOffer.findById(cryptoOfferId);

    //todo check if user has alredy bought cryptoOffer;
    cryptoOffer.buyers.push(userId)
    return cryptoOffer.save();

}

exports.create = (ownerId, cryptoOfferData) => CryptoOffer.create({ ...cryptoOfferData, ownerId: ownerId });

exports.edit = (cryptoOfferId,cryptoOfferData)=>CryptoOffer.findByIdAndUpdate(cryptoOfferId,cryptoOfferData)