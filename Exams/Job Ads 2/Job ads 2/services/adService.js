const Ad = require('../models/Ad');

const getAll = () => Ad.find({}).lean();

const getOneById = (id) => Ad.findById(id).populate('author').lean();

const createAd = (data) => Ad.create(data);

const deleteAd = (id) => Ad.findByIdAndDelete(id);

const editAd = async (id, data) => {
    const editedData = await Ad.findByIdAndUpdate(id, data, { runValidators: true })
    return editedData;
};
const apply = async (adId, userId) => {
    const existing = await Ad.findById(adId);
    console.log(existing);
    existing.applies.push(userId);
   // existing.seats = existing.seats - 1;
    return existing.save();
};

const getFirstThree = ()=>Ad.find({}).limit(3).lean();

const getAllPopulateAutor = async(search)=>Ad.find().populate('author').lean();

// const commentSth = async (id, commentData) => {
//     const data= await Ad.findById(id);

//     data.commentList.push(commentData);
//     photo.save();
//   };

module.exports = {
    getAll,
    getOneById,
    createAd,
    deleteAd,
    editAd,
    apply,
    getFirstThree,
    getAllPopulateAutor,
};