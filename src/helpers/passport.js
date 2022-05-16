import passport from "passport";
import { Strategy as LocalStrategy } from 'passport-local'
import User from '../models/users'

passport.use(
  new LocalStrategy({
      usernameField: 'email',
      passwordField: 'password',
    },
    async (email,password,done)=>{
      // Verifico que el email existe
      const newUser = await User.findOne({email})
      if(!newUser)
        return done(null,false,{message: 'Email not exist'})
      
      // Verifico que el password coincide
      const match = await newUser.matchPassword(password)
      if(!match)
        return done(null,false,{message: 'Incorrect Password'})
      else{
        
        return done(null,newUser)
      }
  })
)

passport.serializeUser((user,done) => {

  return done(null,user._id)
})

passport.deserializeUser(async (id,done) => {
    User.findById(id, function(err, user) {
      // limpio el array de usuairo
      const userClean = {
        _id: user._id,
        name: user.name,
        email: user.email,
        password: user.password
      }
      done(err, userClean);
    });
})

module.exports = passport 


