import { Schema, model } from 'mongoose'
import bcrypt from 'bcryptjs'

const UserSchema = new Schema ({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
},{
  timestamps: true
})

UserSchema.methods.encryptPassword = async (passowrd) => {
  const salt = await bcrypt.genSalt(10)
  return await bcrypt.hash(passowrd, salt)
}

UserSchema.methods.matchPassword = async function (password) {
  return await bcrypt.compare(password, this.password)
}

const User = model("User", UserSchema)

export default User