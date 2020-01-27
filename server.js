const express = require ('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const cors = require('cors');
const knex = require('knex');

const register = require('./controllers/register');
const signIn = require('./controllers/signin');
const profile = require('./controllers/profile');
const sqCheck = require('./controllers/sqCheck');
const image = require('./controllers/image');
const findAcc= require('./controllers/findAcc');
const uploadProfilePic = require('./controllers/uploadProfilePic');
const pwChange = require('./controllers/pwChange');

const db = knex({
    client: 'pg',
    connection: {
        connectionString : process.env.DATABASE_URL,
        ssl: true
    }
});
//console.log(db.select('*').from('users'));
//db.select('*').from('users').then(data => console.log(data));
const app = express();
app.use(bodyParser.json());
app.use(cors());

app.get('/', (req,res) => {
    res.send('it is working');
});
app.post('/signin', (res, req) => signIn.handleSignIn(res, req, db, bcrypt));

app.post('/register', (req, res) => {register.handleRegister(req,res, db, bcrypt)}); // dependencies injection // sending all the dependencies to register.js

app.get('/profile/:id', (req, res) => {profile.handleProfileGet(req, res, db)});

app.put('/image',((req, res) => {image.handleImage(req, res, db)}));
app.post('/imageurl',((req, res) => {image.handleApiCall(req, res)}));
app.post('/findAcc',((req, res) => {findAcc.handleFindAcc(req,res,db)}));
app.put('/uploadpic',((req,res) => {uploadProfilePic.handleUpload(req,res,db)}));
app.post('/sqcheck', ((req,res) => {sqCheck.handleSQCheck(req,res,db,bcrypt);}));
app.put('/pwchange',(req,res) => pwChange.handlePWchange(req,res,db,bcrypt));

const port = process.env.PORT || 3001;

app.listen(port, () => {
    console.log(`app is running on port ${port}`);
});