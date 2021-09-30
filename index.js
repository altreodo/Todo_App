const { log } = require('console');
const { render } = require('ejs');
const express=require('express');
const { findSourceMap } = require('module');
const path=require('path');
const port=8000;
const db=require('./config/mongoose');
const Data_l = require('./models/data');
const app=express();
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));
app.use(express.urlencoded());
app.use(express.static('assets'));

app.get('/',function(req,res){
    Data_l.find({},function(err,data){
        if(err){
            console.log("error in fetching data");
            return;
        }
        return res.render('todo',{
            Data_list:data
        });
    });
});
  
app.post('/data',function(req,res){
    var datans;
    var j=req.body.date;
    if(j[5]+j[6]=='01'){
     dateans="JANUARY"
    }if(j[5]+j[6]=='02'){
        dateans="FEBRUARY"
       }
    if(j[5]+j[6]=='03'){
        dateans="MARCH"
       }
       if(j[5]+j[6]=='04'){
        dateans="APRIL"
       }if(j[5]+j[6]=='05'){
        dateans="MAY"
       }
       if(j[5]+j[6]=='06'){
        dateans="JUNE"
       }
       if(j[5]+j[6]=='07'){
        dateans="JULY"
       }
       if(j[5]+j[6]=='08'){
        dateans="AUGUST"
       }
       if(j[5]+j[6]=='09'){
        dateans="SEPTEMBER"
       }
       if(j[5]+j[6]=='10'){
        dateans="OCTOBER"
       }
       if(j[5]+j[6]=='11'){
        dateans="NOVEMBER"
       }
       if(j[5]+j[6]=='12'){
        dateans="DECEMBER"
       }
    dateans=dateans+" " +j[8]+j[9]+", "+j[0]+j[1]+j[2]+j[3];
    const colr=["#34568B","#DD4124","#D65076","#9B2335","#C3447A","#FDAC53","#B55A30","#F5DF4D","#E9897E","#00A170","#D2386C"]
    var cl=colr[Math.floor(Math.random() * colr.length)];
    Data_l.create({
        discription:req.body.det,
        category:req.body.cat,
        date:dateans,
        color:cl
    },function(err,newContact){
        if(err){
            console.log("error in creating contact");
            return;
        }
        console.log("new routine created",newContact);
        return res.redirect('back');
    })
})
var to_del=[];
app.listen(port,function(err){
    if(err){
        //console.log('Error:',err)
        console.log(`Error in running the server ${err}`);
    }
    console.log("Server is running on port",port);
})
app.get('/add',function(req,res){
    console.log(to_del);
    var kl=0;
    let d=req.query.id;
    for(let y=0;y<to_del.length;y++){
        if(to_del[y]==d){
            kl++;
            to_del.splice(y,1);
        }
    }if(kl==0){
    to_del.push(d);
    }
})
app.get('/delete-data',function(req,res){
    for(let y=0;y<to_del.length;y++){
        Data_l.findByIdAndDelete(to_del[y],function(err){
            if(err){
            console.log("Couldn't find the contact");
            return;
            }
        })
    }
    to_del=[];
    return res.redirect('back');
})