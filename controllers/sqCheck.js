const handleSQCheck = (req,res,db,bcrypt) => {
    const {email, answer} = req.body;
    console.log(req.body.email);
    console.log(answer);
    console.log(req.body);

    if(!email || !answer){
        return (res.status(400).json('Please enter the answer in the TextField'));
    }

    db.select('*').from('login').where('email', '=',email)
        .then(data => {
            console.log(data);
            const isValid = bcrypt.compareSync(answer, data[0].answerhash);
            console.log(isValid);
            if(isValid){
                return db.select('*').from('users')
                    .where('email','=',email)
                    .then(user => res.json(user[0]))
                    .catch(err => err.status(400).json('server error'));
            }else{
                return res.status(400).json('answer wrong')
            }
        }).catch(err => res.status(400).json('Server Error'))

};

module.exports = {
    handleSQCheck:handleSQCheck
};