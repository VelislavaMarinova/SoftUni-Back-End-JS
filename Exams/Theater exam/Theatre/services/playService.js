const Play = require('../models/Play');

const getAllPublicBydate = async () => {
    // Sort the results based on the "createdAt" field in ascending order
    const plays = await Play.find({ isPublic: true }).sort({ createdAt: -1 }).lean();
    return plays;
};

const getAllByDate = async () => {
    // Sort the results based on the "createdAt" field in ascending order
    const plays = await Play.find({}).sort({ createdAt: -1 }).lean();
    return plays;
};
const getAllByLikesCount = async () => {
    // Sort the results based on the "createdAt" field in ascending order
    const plays = await Play.find({}).sort({ likesCount: -1 }).lean();
    return plays;
};


const getThreeByLikesCount = async () => {
    // Sort the results based on the "createdAt" field in ascending order
    const plays = await Play.find({}).sort({ likesCount: -1 }).limit(3).lean();
    return plays
};

const create = (play) => Play.create(play);

const getOneById = (id) => Play.findById(id).lean();

const deleteById = (id) => Play.findByIdAndDelete(id);

const edit = async (id, play) => {
    const editedCourse = await Play.findByIdAndUpdate(id, play, { runValidators: true })
    return editedCourse;
};

const likePlay = async (playId, userId) => {
    const existing = await Play.findById(playId);
    existing.likes.push(userId);
    existing.likesCount++
    return existing.save();
}

module.exports = {
    getAllPublicBydate,
    getThreeByLikesCount,
    getAllByDate,
    getAllByLikesCount,
    create,
    getOneById,
    deleteById,
    edit,
    likePlay,

}