const CryptoOffer = require('../models/CryptoOffer')

exports.getAll=()=>CryptoOffer.find({});

exports.getOne=(cryptoOfferId)=>CryptoOffer.findById(cryptoOfferId);

exports.create = (ownerId, cryptoData)=>CryptoOffer.create({...cryptoData, ownerId: ownerId});