const handleSignIn = (req, res, db, bcrypt) => {

    const {email, password} = req.body;

    if(!email || !password){
    return res.status(400).json('incorrect form submission');
}
    db.select('email', 'hash').from('login')
        .where('email', '=', email)
        .then(data => {
            const isValid = bcrypt.compareSync(password, data[0].hash); //comparing the hash and entered password using bcrypt
            if(isValid){
                return db.select('*').from('users')
                    .where('email','=', email)
                    .then(user => res.json(user[0]))
                    .catch(err => err.status(400).json('unable to get user'));//you can send err to the front-end but its not very secure for the user to know so much
//user[0] because we want to grab the array(not a whole object// it's just looks nicer) and remember user object has only one entry [0]
            }else{
                res.status(400).json("wrong credentials");
            }
        }).catch(err => res.status(400).json('Wrong Credentials'))
};

module.exports = {
    handleSignIn: handleSignIn
};