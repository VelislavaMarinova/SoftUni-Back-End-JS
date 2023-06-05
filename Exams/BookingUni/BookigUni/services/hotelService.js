const Hotel = require('../models/Hotel');

const getAll = async () => {

};

const getById = async (id) => {

}
const create = async (hotel) => {
    return await Hotel.create(hotel)
}
const update = async (id, hotel) => {

}

const deleteById = async (id) => {

};

const bookRoom = (hotelId, userId) => {

}

module.exports = {
    getAll,
    getById,
    create,
    update,
    deleteById,
    bookRoom
}
