const Clarifai = require("clarifai");

const app = new Clarifai.App({
	apiKey: 'de268b0777544a6f89864cc57e5a42a2'
  })

const handleApiCall =(req, res) => {
	app.models
	.predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
	.then(data => {
		res.json(data);
	})
	.catch(err => res.status(400).json('Please enter a valid url.'))



}
 

const handleImage = (req, res, db) => {
	
    const { id } = req.body; 
	db('users').where('id', '=', id)
	.increment('entries', 1)
	.returning('entries')
	.then(entries => {
		res.json(entries[0]);
	})
	.catch(err => res.status(400).json('Wrong credentials!'));
};

module.exports = {
	handleImage,
	handleApiCall
}