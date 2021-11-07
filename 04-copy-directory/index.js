const fs=require('fs');
const path=require('path');
const pathBaseFolder=path.join(__dirname, 'files');
const pathCopyFolder=path.join(__dirname, 'files-copy');


fs.mkdir(pathCopyFolder,{recursive:true},err=>{
    if(err) throw err;
});
fs.readdir(pathCopyFolder,(err,files)=>{
    if(err)throw err;
    files.forEach(file=>{
        fs.unlink(path.join(pathCopyFolder, file), err=>{
            if(err) throw err;
        })
    })
})

setTimeout(()=>{
    fs.readdir(pathBaseFolder,(err,files)=>{
        if(err) throw err;
        files.forEach(file=>{
            fs.copyFile(path.join(pathBaseFolder,file),path.join(pathCopyFolder,file), function(err){
                if(err) throw err;
            } );
        })  
    })
},100)