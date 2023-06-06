const Hotel = require('../models/Hotel');

const getAll = async () => {
    return Hotel.find({}).lean();
};

const getById = async (id) => {
    return Hotel.findById(id).lean();
}
const create = async (hotel) => {
    return await Hotel.create(hotel)
}
const update = async (id, hotel) => {
    const editedHotel = await Hotel.findByIdAndUpdate(id, hotel, { runValidators: true })
    return editedHotel;
    //or
    // const existing = await Hotel.findById(id);
    // existing.name = hotel.name;
    // existing.city = hotel.city;
    // existing.imageUrl = hotel.imageUrl;
    // existing.rooms = hotel.rooms;

    // await existing.save();

}
const deleteById = async (id) => Hotel.findByIdAndDelete(id)

const bookRoom = async (hotelId, userId) => {
    const hotel = await Hotel.findById(hotelId);
    console.log(hotel.bookings);
    if (hotel.bookings.includes(userId)) {
        throw new Error('Cannot book twice');
    }
    hotel.bookings.push(userId)
    await hotel.save();
}

async function getByUserBooking(userId){
    return (await Hotel.find({bookings: userId}).lean())
}

module.exports = {
    getAll,
    getById,
    create,
    update,
    deleteById,
    bookRoom,
    getByUserBooking
}
