//const bcrypt = require('bcrypt')

//const Users = require('../models/users')

const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
    /*
    let { username, password } = req.headers;

    if (username && password) {
        Users.findBy({ username })
            .first()
            .then(user => {
                if (user && bcrypt.compareSync(password, user.password)) {
                    next()
                }
                else {
                    res.status(401).json({ message: 'invalid credentials' })
                }
            })
            .catch(({ name, message, stack }) => {
                res.status(500).json({ name, message, stack })
            })
    }
    else {
        res.status(400).json({ message: 'missing credentials' })
    }
    */
    const { authorization } = req.headers
    const secret = process.env.JWT_SECRET || 'is it secret, is it safe?'
    if (authorization) {
        jwt.verify(authorization, secret, (err, decodedToken) => {
            if (err) {
                res.status(401).json({ message: 'invalid credentials' })
            }
            else {
                req.decodedToken = decodedToken
                next()
            }
        })
    }
}