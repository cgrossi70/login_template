import dotenv from 'dotenv'
import mongoose from 'mongoose'

dotenv.config()

const { DB_HOSTNAME, DB_USERNAME, DB_PASSWORD, DB_DATABASE } = process.env

let MONGODB_URI = ''

if(DB_USERNAME)
  MONGODB_URI = `mongodb+srv://${DB_USERNAME}:${DB_PASSWORD}@${DB_HOSTNAME}/${DB_DATABASE}`
else
  MONGODB_URI = `mongodb://${DB_HOSTNAME}/${DB_DATABASE}`

  mongoose.connect(MONGODB_URI)
  .then(()=>{
    console.log('Database connected succesfully')
  }) 
  .catch((error)=>{
    console.log(error)
  })

  module.exports = mongoose