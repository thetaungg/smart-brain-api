const handleFindAcc = (req, res, db) => {
    const email = req.body.email;
    if(!email){
        return res.status(400).json('Please Enter Email');
    }
    db.select('email').from('users').where('email','=',email)
        .then(data => {
            return db.select('*').from('users').where('email', '=',email)
                .then(user => res.json(user[0]))
                .catch(err => res.status(400).json('cannot get the user'));
        }).catch(err => res.status(400).json(`user doesn't exist`));
};

module.exports= {
    handleFindAcc
};
