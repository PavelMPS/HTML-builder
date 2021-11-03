const fs=require('fs');
const path=require('path');

let myReadStream=fs.createReadStream(path.join(__dirname, '/text.txt'), 'utf-8');
myReadStream.on('data',chunk=>{
    console.log(chunk.trim());
    
});
