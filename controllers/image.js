const Clarifai = require('clarifai');

//to make it look nice // instead of writing in the element tab
const app = new Clarifai.App({
    apiKey: process.env.API_KEY_CLARIFAI || '73f2c831ec9546b480b4899a8ee515bf'
});
const handleApiCall = (req,res) => {
    app.models.predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
        .then(data => res.json(data))
        .catch(response => response.status(400).json('unable to work with api'));
};

const handleImage = (req, res, db) => {
    const { id } = req.body;
    db('users').where('id', '=', id)
        .increment('entries', 1)
        .returning('entries')
        .then(entries => res.json(entries[0]))
        .catch(err => res.status(400).json('unable to get entries')); //increasing entries //easier with increment method
};

module.exports = {
    handleImage,
    handleApiCall
}; //ES6 usage