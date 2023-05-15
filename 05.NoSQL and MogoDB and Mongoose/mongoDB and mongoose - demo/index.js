const mongoose = require('mongoose');


async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/catShelter');
    console.log('db connected');

    const catSchema = new mongoose.Schema({
        name: String,
        breed: String,
        description: String,
        age: Number
    });

    const Cat = mongoose.model('Cat', catSchema);

    async function readCats() {
        const cats = await Cat.find()
        console.log(cats);
    }
    await readCats();
};



main();