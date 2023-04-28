const fs=require('fs');
const path = require('path')

fs.writeFile(path.resolve(__dirname,'./output.txt'), 'asdasdasd',()=>{
    console.log('file created');
});