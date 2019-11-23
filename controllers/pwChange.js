const handlePWchange = (req,res,db,bcrypt) => {
    const {email, password} = req.body;
    const saltRounds = 10;
    const salt = bcrypt.genSaltSync(saltRounds);
    const newhash = bcrypt.hashSync(password,salt);

    if(!password){
        return res.status(400).json('please enter password')
    }
                 db.update({hash:newhash}).into('login')
                    .where('email','=',email)
                    .then(res.json('success'))
                    .catch(err => res.status(400).json('server error'));

};

module.exports = {
    handlePWchange
}