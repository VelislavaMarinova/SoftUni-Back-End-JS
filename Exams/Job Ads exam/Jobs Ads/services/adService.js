const Ad = require('../models/Ad');

const getAll = () => Ad.find({}).lean();

const getThree = ()=> Ad.find({}).limit(3).lean()

const getOneById = (id) => Ad.findById(id).lean();

const createData = (data) => Ad.create(data);

const deleteData = (id) => Ad.findByIdAndDelete(id);

const editData = async (id, data) => {
    const editedData = await Ad.findByIdAndUpdate(id, data, { runValidators: true })
    return editedData;
};

const apply = async(adId, userId, userData)=>{
    const existing = await Ad.findById(adId);
    existing.usersApplied.push(userId);
    existing.usersAppliedData.push(userData)
    existing.appliesCount++;
    return existing.save();
}


// const commentPhoto = async (photoId, commentData) => {
//     const photo= await Ad.findById(photoId);

//     photo.commentList.push(commentData);
//     photo.save();
//   };

module.exports = {
    getAll,
    getThree,
    getOneById,
    createData,
    editData,
    deleteData,
    apply
};