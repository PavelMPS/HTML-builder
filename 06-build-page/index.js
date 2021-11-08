const fs=require('fs');
const path=require('path');
const input=fs.createReadStream(path.join(__dirname,'template.html'));
const readline=require('readline')
const rl=readline.createInterface({
    input:input 
});


const readFrom=path.join(__dirname,'assets');
const writeTo=path.join(__dirname,'project-dist','assets');

//create project folder
fs.mkdir(path.join(__dirname,'project-dist'),{recursive:true}, err=>{
    if(err)throw err;
});
//copy assets folder 
fs.mkdir(path.join(__dirname,'project-dist','assets'),{recursive:true},err=>{
    if(err)throw err;
})

//reqursive copying assets folder
function copyFolder(pathFold, pathCopy){
  
    fs.readdir(pathFold,{withFileTypes: true},(err,files)=>{
        if(err) throw err;      
        files.forEach(file=>{

            fs.stat(path.join(__dirname,file.name),(err,stats)=>{
                if(file.isFile()){
                    
                    fs.copyFile(path.join(pathFold,file.name),path.join(pathCopy,file.name), (err)=>{
                        if(err) throw err;
                    } );
                }
                if(file.isDirectory()){
                    fs.mkdir(path.join(pathCopy,file.name),{recursive:true},err=>{
                        if(err)throw err;
                    })
                   
                    copyFolder(path.join(pathFold,file.name),path.join(pathCopy,file.name));
                }
            })            
            {              
            } 
        })  
    })
}
copyFolder(readFrom,writeTo);

//create "style.css" and merging styles from folder "style"

fs.stat(path.join(__dirname,'project-dist','style.css'),(err,stats)=>{
    if(err){
        return err;
    }
    fs.unlink(path.join(__dirname,'project-dist','style.css'),err=>{
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
                fs.appendFile(path.join(__dirname,'project-dist','style.css'),chunk,err=>{
                    if(err)throw err;
                })
            })
        }
    })
})

//create "index.html"
let arr=[];
let contentComp='';
rl.on('line',line=>{
    arr.push(line);
})

setTimeout(()=>{
  for(let i=0;i<arr.length;i++){   
   if(arr[i].indexOf('{{')>0){        
    let contentName=arr[i].trim();   
    contentName=contentName.substring(2,contentName.length-2);    
    const contentReadStream=fs.createReadStream(path.join(__dirname,'components',`${contentName}.html`),'utf-8');    
    contentReadStream.on('data',data=>{        
    contentComp=data;
    arr[i]=contentComp;
        })   
      }       
    }
 },1000)

setTimeout(()=>{
    let arr1='';
    arr1=arr.join('\n')
    fs.writeFile(path.join(__dirname,'project-dist','index.html'),arr1,err=>{
        if(err)throw err;
    })
},2000)
    