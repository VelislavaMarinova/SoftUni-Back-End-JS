const CryptoOffer = require('../models/CryptoOffer')

exports.create = (ownerId, cryptoData)=>CryptoOffer.create({...cryptoData, ownerId: ownerId});