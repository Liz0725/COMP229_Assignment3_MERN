import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema({
  name: { type: String },
  email: { type: String, unique: true }, // ✅ add uniqueness
  password: { type: String },
  role: { type: String, enum: ['user', 'admin'], default: 'user' }, // ✅ add this line
  created: { type: Date, default: Date.now },
  updated: { type: Date, default: Date.now }
})

export default mongoose.model('User', UserSchema)
