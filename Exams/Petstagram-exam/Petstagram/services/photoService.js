const Photo = require('../models/Photo');

const getAll = () => Photo.find({}).lean();

const getOneById = (photoId) => Photo.findById(photoId).lean();

const createPhoto = (photo) => Photo.create(photo);

const deletePhoto = (photoId) => Photo.findByIdAndDelete(photoId);

const editPhoto = async (id, photo) => {
    const editedPhoto = await Photo.findByIdAndUpdate(id, photo, { runValidators: true })
    return editedPhoto;
};

const commentPhoto = async (photoId, commentData) => {
    const photo= await Photo.findById(photoId);
  
    photo.commentList.push(commentData);
    photo.save();
  };

module.exports = {
    getAll,
    getOneById,
    createPhoto,
    editPhoto,
    deletePhoto,
    commentPhoto
};