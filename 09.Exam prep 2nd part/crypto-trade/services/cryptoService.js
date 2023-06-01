const CryptoOffer = require('../models/CryptoOffer');
const { login } = require('./authService');

exports.getAll = () => CryptoOffer.find({});

exports.search = async (name, paymentMethod) => {
    let allCryptoOffersIfSearch =  await this.getAll().lean();
//memory filtration
    if (name) {
        allCryptoOffersIfSearch = allCryptoOffersIfSearch.filter(x => x.name.toLowerCase() == name.toLowerCase())
    }
    if (paymentMethod) {
        allCryptoOffersIfSearch =  allCryptoOffersIfSearch.filter(x => x.paymentMethod == paymentMethod)
    }


    return allCryptoOffersIfSearch;
}

exports.getOne = (cryptoOfferId) => CryptoOffer.findById(cryptoOfferId);

exports.buy = async (userId, cryptoOfferId, res) => {

    // CryptoOffer.findByIdAndUpdate(cryptoOfferId, {$push: {buyers: userId}});
    const cryptoOffer = await CryptoOffer.findById(cryptoOfferId);
    const isOwner = cryptoOffer.ownerId == userId;

    //chek if owner tries to buy-forbidden page
    if (isOwner) {

        throw new Error("Forbidden page!");
    }
    //todo check if user has alredy bought cryptoOffer;
    cryptoOffer.buyers.push(userId)
    return cryptoOffer.save();

}

exports.create = (ownerId, cryptoOfferData) => CryptoOffer.create({ ...cryptoOfferData, ownerId: ownerId });

exports.edit = async (cryptoOfferId, cryptoOfferData, userId) => {
    const cryptoOffer = await CryptoOffer.findById(cryptoOfferId);
    const isOwner = cryptoOffer.ownerId == userId;
    if (!isOwner) {
        throw new Error("Forbidden page!");
    }

    await CryptoOffer.findByIdAndUpdate(cryptoOfferId, cryptoOfferData, { runValidators: true });
};

exports.delete = (cryptoOfferId) => CryptoOffer.findByIdAndDelete(cryptoOfferId);