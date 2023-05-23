const mongoose = require('mongoose');


const catSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Require name"],
        minLength:[5, "Min length 5 digits"]
    },
    breed: String,
    description: String,
    age: {type:Number}
});

catSchema.methods.makeSound = function () {
    console.log(`My name is ${this.name} ,and I can Meow!`);
};

//custom validator
catSchema.path('name').validate(function(){
    return this.name.startsWith('N')
}, 'Name should start with N')
const Cat = mongoose.model('Cat', catSchema);

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/catShelter');
    console.log('db connected');


    const cats = await readCats();
    cats.forEach(cat => cat.makeSound())
     await saveCat('ronisds', 'Siam', 'agressive cat', '12')
};

async function saveCat(name, breed, description, age) {

    await Cat.create({
        age,
        breed,
        description,
        name
    })
    // //create a new instance
    // const cat = new Cat({
    //     age,
    //     breed,
    //     description,
    //     name,
    // });
    // //save is a method  of the instnce
    // await cat.save()
};

async function readCats() {
    const cats = await Cat.find()
    console.log(cats);
    return cats;
};

main();