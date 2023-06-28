const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const app = express();
const jwt = require("jsonwebtoken")

app.use(express.json());
app.use(cors());

const db = mysql.createConnection({
    user:"root",
    host:"localhost",
    password:"root",
    database:"LoginSystem",
})

app.post('/register', (req, res)=>{
    const sql = "INSERT INTO users(username, password) VALUES (?,?)";
    
    const username = req.body.username
    const password = req.body.password

    db.query(
        "SELECT * FROM users WHERE username = ? AND password  = ?",
        [username, password],
        (err, result) => {
             console.log(result.length)
            if(result.length > 0){
                return res.send({message : "username already registered"})
            }
            else{
                db.query("INSERT INTO users (username, password) VALUES (?,?)",
                [username,password],(err, data) => {
                if(err) {
                    return res.json("Error");
                }
                else{
                    res.send({message : "Successfully registered!!"})
                } 
            })
            }
        }); 
});

app.post('/login', (req,res) =>{
    const username = req.body.username
    const password = req.body.password

    console.log(username, password)
    db.query(
        "SELECT * FROM users WHERE username = ? AND password  = ?",
        [username, password],
        (err, result) => {
            if(result.length > 0){
                const id = result[0].id;
                const token = jwt.sign({id}, "jwtSecretKey", {expiresIn : 300});
                return res.json({Login: true, token, result})
            }
            else {
                res.status(201).send({message : "wrong username/password"})
            }
        });
});

app.post('/new', (req,res) =>{
    
    const categories  = req.body.cat
    const data = req.body.data;

    for(i = 0; i<data.length; i++)
    {
        title = data[i].title
        urlToImage = data[i].urlToImage
        content =data[i].content
        url = data[i].url
        
        db.query("INSERT INTO newsdata (title, urlToImage, content, url ,cat) VALUES (?,?,?,?,?)",
                [title,urlToImage,content,url,categories],(err, data) => {
            })
    } 
    db.query(
        "SELECT * FROM newsdata where cat = ?",[categories],
        (err, result) => {
            if(result.length > 0){
                res.send(result);
            }
            else {
                res.send(err);
            }
        });
        setTimeout(() => {
            db.query( "TRUNCATE TABLE newsdata",
        (err, result) => {  
        })
        }, 5000);
});

app.post('/user_news', (req,res) => {

    title = req.body.title;
    image = req.body.image;
    content = req.body.content
    newsUrl = req.body.newsUrl

    console.log(title, image, content, newsUrl)

    db.query("INSERT INTO usernews (title, image, content, newsUrl) VALUES (?,?,?,?)",
                [title, image, content, newsUrl],(err, result) => {  
            })  

    db.query(
        "SELECT * FROM usernews",
        (err, result) => {

            console.log(result)
            if(result) {
                res.send(result);
            }
            else {
                res.send(err);
            }
        });
            
});

app.get('/user_news', (req,res) => {

    console.log("this is called");
    db.query(
        "SELECT * FROM usernews",
        (err, result) => {

            console.log(result)
            if(result) {
                res.send(result);
            }
            else {
                res.send(err);
            }
        });        
});

app.get('/get_user_new/:id', (req,res) => {
    
    id = req.params.id
    title = req.body.title;
    image = req.body.image;
    content = req.body.content;
    newsUrl = req.body.newsUrl;
   
    db.query(
        "SELECT * FROM usernews where id = ?",[id],
        (err, result) => {
            if(result) {
                console.log(result)
                return res.send(result);
            }
            else {
                res.send(err);
            }
        });        
});


app.put('/update_user_new/:id', (req,res) =>{

    id = req.params.id;
    title = req.body.title;
    image = req.body.image;
    content = req.body.content;
    newsUrl = req.body.newsUrl;

    db.query(
        "UPDATE usernews SET title = ?, image = ?, content = ?, newsUrl = ? where id = ?",
        [title,image,content,newsUrl,id],(err,result) => {
            if(result)
                {
                    return res.send(result);
                }
                
        })
})


app.delete('/delete_user_new/:id', (req,res) =>{
        id = req.params.id;
        db.query(
            
            "Delete from usernews where id = ?", [id],
            (err, result) => {
                if(result)
                {
                    return res.send(result);
                }
            })
})

app.listen(3001, ()=> {
    console.log("Running server")
});

