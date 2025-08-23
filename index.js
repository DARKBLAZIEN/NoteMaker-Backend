const express = require('express');
const fs = require('fs');
const app = express();
const path = require('path');

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname,'public')));
app.set('view engine','ejs');

app.get('/',function(req,res){
    fs.readdir('./files',function(err,files){
        res.render("index",{files:files}); // We are sending the files(stored in the variable 'files') that we read from the folder 'files' to index.ejs in the form of an object stored under the name 'files'. Now you map which file is which
    })
    
})
app.get('/files/:filename',function(req,res){
    fs.readFile(`./files/${req.params.filename}`,'utf-8',function(err,content){
        res.render("show",{filecontent:content,fname:req.params.filename});
    })
})
app.post('/create',(req,res)=>{
    fs.writeFile(`./files/${req.body.title.split(' ').join('')}.txt`,req.body.details,function(err){
        res.redirect('/')
    })
})
app.get('/editpage/:filename',(req,res)=>{
    res.render('editpage',{filename : req.params.filename})
})
app.post('/editor',(req,res)=>{
    fs.rename(`./files/${req.body.oldname}`,`./files/${req.body.newname.split(' ').join('')}.txt`,(err)=>{
        res.redirect('/')
    })
})
app.listen(3000);