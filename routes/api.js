const bcrypt = require('bcrypt')
const router = require('express').Router()
const jwt = require('jsonwebtoken')
const Users = require('../models/users')

router.post('/register', (req, res) => {
  let user = req.body

  const hash = bcrypt.hashSync(user.password, 8)

  user.password = hash

  Users.add(user)
    .then(saved => {
      // create token here
      res.status(201).json(saved)
    })
    .catch(error => {
      res.status(500).json(error)
    })
})

router.post('/login', (req, res) => {
  let { username, password } = req.body
    
  Users.findBy({ username })
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        // create token here
        const token = generateToken(user)
        res.status(200).json({ 
            message: `Welcome ${user.username}!`, 
            token 
        })
      } else {
        res.status(401).json({ message: 'Invalid Credentials' })
      }
    })
    .catch(error => {
      res.status(500).json(error)
    })
})

router.get('/logout', (req, res) => {
  
})

router.get('/users', (req, res) => {

})

function generateToken(user) {
    const payload = {
        username: user.username
    }
    const secret = 'is it secret, is it safe?'

    const options = {
        expiresIn: '1h'
    }

    return jwt.sign(payload, secret, options)
}

module.exports = router
