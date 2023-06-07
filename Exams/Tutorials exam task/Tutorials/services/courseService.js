const Course = require('../models/Course')

const getAllBydate = async () => {
    // Sort the results based on the "createdAt" field in ascending order
    const courses = await Course.find({}).sort({ createdAt: 1 }).lean();
    return courses
};

const getThreeByUserCount = async () => {
    // Sort the results based on the "createdAt" field in ascending order
    const courses = await Course.find({}).sort({ userCount: -1 }).limit(3).lean();
    return courses
};

const createCourse = (course) => Course.create(course);

const getOneById = (id) => Course.findById(id).lean();

const deleteById = (id)=>Course.findByIdAndDelete(id);

const update = async (id, course) => {
    const editedCourse = await Course.findByIdAndUpdate(id, course, { runValidators: true })
    return editedCourse;
};

const enrollUser = async(courseId,userId)=>{
    const existing = await Course.findById(courseId);
    existing.users.push(userId);
    existing.usersCount++;
    return existing.save();
}

module.exports = {
    getAllBydate,
    createCourse,
    getThreeByUserCount,
    getOneById,
    deleteById,
    update,
    enrollUser
}