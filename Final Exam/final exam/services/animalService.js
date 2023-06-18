const Animal = require('../models/Animal');

const getAll = () => Animal.find({}).lean();

const getLastThree = () => Animal.find({}).sort({ _id: -1 }).limit(3).lean();

const getOneById = (id) => Animal.findById(id).lean();

const createAnimal = (data) => Animal.create(data);

const deleteAnimal = (id) => Animal.findByIdAndDelete(id);

const editAnimal = async (id, data) => {
    const editedData = await Animal.findByIdAndUpdate(id, data, { runValidators: true })
    return editedData;
};

const donate = async (animalId, userId) => {
    const existing = await Animal.findById(animalId);
    existing.donations.push(userId);
    return existing.save();
};


    module.exports = {
        getAll,
        getLastThree,
        getOneById,
        createAnimal,
        deleteAnimal,
        editAnimal,
        donate
    };