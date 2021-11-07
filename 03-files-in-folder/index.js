const fs=require('fs');
const path=require('path');
const secretFolder=path.join(__dirname, '/secret-folder');




fs.readdir(secretFolder,{withFileTypes: true}, (err, files)=>{
    if(err) throw err;
    files.forEach(file=>{
        if(file.isFile()){          
            fs.stat(path.join(__dirname, 'secret-folder', file.name), (err,stats)=>{
               let nameFile=file.name.slice(0, file.name.indexOf('.'));
               let extFile=path.extname(file.name).slice(1);
                console.log(`${nameFile} - ${extFile} - ${stats.size}b`);
            })          
        }       
    })
})

