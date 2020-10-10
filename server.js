const express = require('express'); 
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');


const db = knex({
	client: 'pg', 
	connection: {
		host: '127.0.0.1',
		user: 'sdvelu',
		password: '',
		database: 'facedetection'
	}
});


const app = express(); 
app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => {
	console.log(req, res); 
});

app.post('/signin', (req, res) => {
	signin.handleSignin(req, res, db, bcrypt);
});


app.post('/register', (req, res) => { 
	
	register.handleRegister(req, res, db, bcrypt);
});


app.get('/profile/:id', (req, res) => {
	profile.handleProfile(req, res, db);
});

app.put('/image', (req, res) => {

	image.handleImage(req, res, db);
});

app.put('/imageUrl', (req, res) => {
	image.handleApiCall(req, res, db);
});



app.listen(3001, () => {
	console.log('App is running');
});

/*
	/--> res = this is working
	/signIn --> POST = success/fail
	/register --> POST = user
	/profile/:userId --> GET = user
	/image --> PUT --> user

*/