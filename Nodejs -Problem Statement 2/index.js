const connection = require('./connection')
const express = require('express');
const bodyParser = require('body-parser');
const metrics = require('./metrics')
const { register } = require('./metrics');

var app = express();
app.use(bodyParser.json())


app.get('/metrics', async (req, res) => {
    res.set('Content-Type', register.contentType);
    res.end(await register.metrics());
  });

app.get('/users',(req,res)=>{
   connection.query('select * from user;', (err,rows)=>{
    if(err){
        console.log(err)
    }
    else{
        res.send(rows)
    }
   })
})

app.get('/users/:id',(req,res)=>{
    connection.query('select * from user where id=?',[req.params.id], (err,rows)=>{
     if(err){
         console.log(err)
     }
     else{
         res.send(rows)
     }
    })
 })
 
 app.delete('/users/:id',(req,res)=>{
    connection.query('delete  from user where id=?',[req.params.id], (err,rows)=>{
     if(err){
         console.log(err)
     }
     else{
         res.send(rows)
     }
    })
 })

 app.post('/users',(req,res)=>{
    var tmp = req.body
    var tmpData = [tmp.name,tmp.age]
    connection.query('insert into user(name,age) values(?)',[tmpData], (err,rows)=>{
     if(err){
         console.log(err)
     }
     else{
         res.send(rows)
     }
    })
 })

 app.patch('/users',(req,res)=>{
    var tmp = req.body
    connection.query('update user set ? where id='+tmp.id,[tmp], (err,rows)=>{
     if(err){
         console.log(err)
     }
     else{
         res.send(rows)
     }
    })
 })

 app.put('/users',(req,res)=>{
    var tmp = req.body
    connection.query('update user set ? where id='+tmp.id,[tmp], (err,rows)=>{
     if(err){
         console.log(err)
     }
     else {
         if(rows.affectedRows==0){
            var tmpData = [tmp.name,tmp.age]
            connection.query('insert into users(name,age) values(?)',[tmpData],(err,rows)=>{
                  if(err) {
                        console.log(err)
                } else {
                    res.send(rows)
                }
         })
        }
         else {
               res.send(rows)
         }
        }

    })
})


app.listen(3000,()=>console.log('Express Server is running on 3000'))

