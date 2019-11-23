const handleRegister = (req, res, db, bcrypt) => {
    const {name,email,password,SQ,answer} = req.body;
    const saltRounds = 10;
    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(password,salt);
    const answerhash = bcrypt.hashSync(answer,salt);

    if(!email || !name || !password){
        return res.status(400).json('incorrect form submission'); //return (for the code to stop running if the if statement is true or else it'll keep running
    }
            db.transaction(trx => { //knex transaction // to ensure consistencies among table // if you can't update the users table, you also can't update login table
                trx.insert({
                    answerhash: answerhash,
                    hash: hash,
                    email: email
                }).into('login')
                    .returning('email')
                    .then(loginEmail => {
                        return trx('users')
                            .returning('*')
                            .insert({
                                email: loginEmail[0],
                                name: name,
                                sq: SQ,
                                joined: new Date()
                            })
                            .then(user => res.json(user[0]));
                    }).then(trx.commit)
                    .catch(trx.rollback); //trx need to commit after all the transactions completed or nothing will change
            })

                .catch(err => res.status(400).json('unable to register')); //creating user and sending user_info to the front-end using .returning
        };
    module.exports = {
        handleRegister: handleRegister
    };