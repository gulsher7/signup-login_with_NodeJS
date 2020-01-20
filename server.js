const express = require("express");
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();
mongoose.connect('mongodb://localhost/mydata');
require('./models/usersdata');
 
var db=mongoose.connection; 
db.on('error', console.log.bind(console, "connection error")); 
db.once('open', function(callback){ 
    console.log("connection succeeded"); 
}); 

const usersdata = mongoose.model("usersdata");

hostname= 'localhost';
app.set('port', process.env.PORT || 3000);
var port = app.get('port');

app.use(express.static('public')).use(bodyParser.urlencoded({ extended: true }));

app.set('view engine', 'ejs');
app.use('/static', express.static('public'))


app.get('/', (req, res) => {
    res.render('index');
});


app.get('/signup', (req, res) => {
    res.render('signup');
});

//database configuration 
app.post('/signup', async (req, res) => {
    try {
        const getData = new usersdata();
        getData.username = req.body.username;
        getData.email = req.body.email;
        getData.password = req.body.password;
        getData.save();
        await res.send({
            data: getData,
            status: "success"
        });
    } catch{
        res.send({
            status: "failed"
        })
    }
});


app.get('/login', (req, res) => {
    res.render('login');
});


app.post('/login', async (req, res) => {
    try {
        const mydata = await usersdata.find({username:req.body.username}, {password: 0});
        console.log(req.body.username)
        res.send({
            results: mydata,
            status: 'success'
        })
    }catch{
        res.send({
            problem: 'Problem in getting data',
            status: 'failed'
        })
    }
});




app.get('/userdata', (req, res) => {
    res.render('userdata');
});

app.listen(port, (req, res) => {
    console.log(`I am running at port number http://${hostname}:${port}`);
});