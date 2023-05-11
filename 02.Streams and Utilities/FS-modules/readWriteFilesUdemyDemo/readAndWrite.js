const fs = require('fs');

//blocking and synchronous code
const textIn = fs.readFileSync('./input.txt', 'utf-8');
console.log(textIn);
const textOut = `this is about the avocado: ${textIn}.\nCreated on ${Date.now()}`;
fs.writeFileSync('./output.txt', textOut);
console.log('File written!');

//non-blocking and asynchronous code
fs.readFile('./start.txt', 'utf-8', (err, data1) => {
    if(err){
        return console.log('ERROR');
    }
    fs.readFile(`./${data1}.txt`, 'utf-8', (err, data2) => {
        fs.readFile(`./append.txt`, 'utf-8', (err, data3) => {
            console.log(data3);

            fs.writeFile('./final.txt',`${data2}\n${data3}`,'utf-8', err=>{
                console.log('written');
            })
        });
    });
});
console.log('after readfile');