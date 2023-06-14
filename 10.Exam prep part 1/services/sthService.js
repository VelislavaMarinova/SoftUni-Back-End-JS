const Sth = require('../models/Sth');

const getAll = () => StyleSheet.find({}).lean();

const getOneById = (id) => Sth.findById(id).lean();

const createSth = (data) => Sth.create(data);

const deleteSth = (id) => Sth.findByIdAndDelete(id);

const editSth = async (id, data) => {
    const editedData = await Sth.findByIdAndUpdate(id, data, { runValidators: true })
    return editedData;
};

const commentSth = async (id, commentData) => {
    const data= await Sth.findById(id);
  
    data.commentList.push(commentData);
    photo.save();
  };

module.exports = {
    getAll,
    getOneById,
    createSth,
    deleteSth,
    editSth,
    commentSth
};