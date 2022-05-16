import passport from 'passport'
import User from '../models/users'

const usersCtrl = {}

usersCtrl.renderSignupForm = (req,res) => {
  res.render('users/signup')
}

usersCtrl.renderSigninForm = (req,res) => {
  res.render('users/signin')
}

usersCtrl.signin = passport.authenticate("local",{
  successRedirect: '/',
  failureRedirect: '/users/signin', 
  failureFlash: true 
})

usersCtrl.signup = async (req, res) => {
  const errors = []
  const { name, email, password, confirm_password } = req.body 
  if(password !== confirm_password)
    errors.push({error: 'The passwords must be equals'})
  
  if(password.length < 4)
    errors.push({error: 'The passwords must be at least 4 characters'})
  
  const userEmail = await User.findOne({email: email})
    
  if(userEmail)
    errors.push({error: 'Email already exist'})

  if(errors.length > 0){
    req.flash('error_msg',errors)
    return res.redirect('/users/signup')
  }
  else {
    const newUser = new User ({name, email, password})
    newUser.password = await newUser.encryptPassword(password)
    console.log(newUser)
    await newUser.save()
    req.flash('success_msg','User signed up successfully')
    res.redirect('/users/signin')
  }
}

usersCtrl.logout = (req,res) =>{
  //passport.logout()
  req.flash('success_msg','You are logged out !!!!')
  res.redirect('/users/signin')
}

module.exports = usersCtrl