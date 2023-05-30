const CryptoOffer = require('../models/CryptoOffer')

exports.getAll=()=>CryptoOffer.find({});

exports.create = (ownerId, cryptoData)=>CryptoOffer.create({...cryptoData, ownerId: ownerId});