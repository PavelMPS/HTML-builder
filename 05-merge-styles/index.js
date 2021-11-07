const fs=require('fs');
const path=require('path');

fs.stat(path.join(__dirname,'project-dist','bundle.css'),(err,stats)=>{
    if(err){
        return err;
    }
    fs.unlink(path.join(__dirname,'project-dist','bundle.css'),err=>{
             if(err)throw err;
         })
})

fs.readdir(path.join(__dirname, 'styles'),{withFileTypes: true}, (err, files)=>{
    if(err)throw err;
    files.forEach(file=>{
        let extFile=path.extname(file.name).slice(1);
        if(file.isFile()&&extFile==='css'){
            let myReadStream=fs.createReadStream(path.join(__dirname,'styles',file.name));
            myReadStream.on('data',chunk=>{
                fs.appendFile(path.join(__dirname,'project-dist','bundle.css'),chunk,err=>{
                    if(err)throw err;
                })
            })
        }
    })
})
