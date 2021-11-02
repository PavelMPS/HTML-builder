const fs=require('fs');
const path=require('path');

let myReadStream=fs.createReadStream(__dirname + '/text.txt', 'utf-8');

myReadStream.on('data',chunk=>{
    console.log(path.join(chunk.trim()));
});
