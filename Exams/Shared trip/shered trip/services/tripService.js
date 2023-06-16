const Trip = require('../models/Trip');

const getAll = () => Trip.find({}).lean();

const getAllByUserId = (userId) => Trip.find({ owner: userId }).lean();

const getOneById = (id) => Trip.findById(id).populate('owner').lean();

const createTrip = (data) => Trip.create(data);

const deleteTrip = (id) => Trip.findByIdAndDelete(id);

const editTrip = async (id, data) => {
    const editedData = await Trip.findByIdAndUpdate(id, data, { runValidators: true })
    return editedData;
};

const joinTrip = async (tripId, userEmail, seats) => {
    const existing = await Trip.findById(tripId);
    console.log(existing);
    existing.buddies.push(userEmail);
    existing.seats = existing.seats - 1;
    return existing.save();
};
// const commentSth = async (id, commentData) => {
//     const data= await Trip.findById(id);

//     data.commentList.push(commentData);
//     photo.save();
//   };

module.exports = {
    getAll,
    getOneById,
    createTrip,
    deleteTrip,
    editTrip,
    joinTrip,
    getAllByUserId,
};