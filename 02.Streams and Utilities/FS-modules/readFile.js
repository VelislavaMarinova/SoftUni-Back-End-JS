const fs = require('fs');
const fsp = require('fs/promises');
const path =require('path');
const filePath = path.resolve(__dirname, './data.txt')

//Synchronous reading from file - very slow process
const text = fs.readFileSync(filePath, { encoding: 'utf-8' });//'./data.txt'
console.log(text);
console.log('read file');

//Asynchronous reading from file - works with callbacks
const asyncText = fs.readFile(filePath, { encoding: 'utf-8' }, (err, data) => {
    if (err) {
        return
    }
    console.log(data);
});
console.log('read file async');

//Asynchronous reading by using promises
fsp.readFile(filePath,{encoding: 'utf-8'})
.then(result=>{
    console.log(result);
});
console.log('read file async fsp');


