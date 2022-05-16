import express from "express";
import morgan from "morgan";
import passport from 'passport'
import path from "path";
import session from 'express-session'
import flash from 'connect-flash'
import dotenv from 'dotenv'
import { engine } from 'express-handlebars'
import indexRoutes from './routes/index.routes'
import usersRoutes from './routes/users.routes'


dotenv.config()

const app = express()
import './helpers/passport'

// Setup
app.set('port',process.env.PORT || 3000)
app.set('views',path.join(__dirname, 'views')) 
app.engine('.hbs',engine({
  defaultLayout: 'main',
  layoutsDir: path.join(app.get('views'),'layouts'),
  partialsDir: path.join(app.get('views'),'partials'),
  extname: '.hbs'
}))
app.set('view engine','.hbs')

// Middlewares
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(session({
  secret: 'my_secret_key',
  resave: true,
  saveUninitialized: true
}))
app.use(passport.initialize())
app.use(passport.session())
app.use(flash())

// Globas
app.use((req, res, next)=>{
  console.log(req.user)
  console.log(req.flash('error'))
  res.locals.suscess_msg = req.flash('success_msg')
  res.locals.error_msg = req.flash('error_msg')
  res.locals.error = req.flash('error')
  res.locals.user = req.user
  next()
})

// Routes
app.use(indexRoutes)
app.use(usersRoutes)

// Public 
app.use(express.static(path.join(__dirname,'public')))

export default app
