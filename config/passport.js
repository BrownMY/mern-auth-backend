require('dotenv').config();
// A passport strategy for authenticating with a JSON Web Token
// This allows to authenticate endpoints using a token
const { Strategy, ExtractJwt } = require('passport-jwt')
//How would we refactor the above lines with destructuring
const mongoose = require('mongoose')

//import user model
const { User } = require('../models/user')

const options = {};
options.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken()
options.secretOrKey = process.env.JWT_SECRET;


module.exports = (passport) => {
    passport.use(new Strategy(options, (jwt_payload, done) => {
        //Have a user that will find by the ID inside of the Payload
        //When we get user back, we will check to see if user is in database
    }))
    User.findById(jwt_payload.id)
    .then(user => {
        //jwt_payload is an object that will contain JWT info
        //done is callback that will be using to return user or false
        if (user) {
            //if user is found, return null (for error)
            return done(null, false)
        } else {
            return done(null, false)
        }
    })
    .catch(error => {
        console.log(`=======> ERROR below(passport.js)`)
        console.log(error)
    })
}