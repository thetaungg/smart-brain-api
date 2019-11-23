const handleUpload = (req,res,db) =>{

    const {profilepicurl,email} = req.body;
    console.log(email);
    console.log(profilepicurl);
    db.update({profilepicurl: profilepicurl}).into('users')
        .where('email','=',email)
        .returning('profilepicurl')
        .then(url => res.json(url[0]))
        .catch(err => res.status(400).json('email incorrect'));
};

module.exports = {
    handleUpload
};