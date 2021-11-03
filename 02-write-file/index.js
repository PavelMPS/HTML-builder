const fs=require('fs');
const process=require('process');
const path=require('path');
const readLine = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
  });
console.log('Добрый день! Введите данные:')
let myWriteStream=fs.createWriteStream(path.join(__dirname,'/text.txt'),'utf-8');


  readLine.on('line', (date) => {
    if (date === 'exit') {
        console.log('До новых встреч!');
        process.exit();
    }
    myWriteStream.write(date+'\n', err=>{
        if(err) throw err;
    })
   
  });
  process.on('beforeExit',function(){
    console.log('До свидания!');
  })
